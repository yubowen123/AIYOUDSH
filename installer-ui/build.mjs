import { execFile } from 'node:child_process';
import { mkdir, writeFile, readFile, cp, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execute = promisify(execFile);
const sourceDirectory = dirname(fileURLToPath(import.meta.url));

/**
 * Build the native installer without running it or touching a Harness profile.
 * resourcesSource, when supplied, is copied as the Contents/Resources root and
 * must contain installer/installer.mjs, installer/vendor/yaml and runtime/.
 */
export async function buildInstaller(appPath, resourcesSource, options = {}) {
  const requestedArch = options.arch ?? process.arch;
  const swiftArch = requestedArch === 'arm64' ? 'arm64' : requestedArch === 'x64' ? 'x86_64' : null;
  if (!swiftArch) throw new Error('Installer architecture must be arm64 or x64.');
  const minimumSystemVersion = requestedArch === 'x64' ? '13.0' : '12.0';
  if (process.platform !== 'darwin') throw new Error('The AppKit installer must be built on macOS.');
  const { version } = JSON.parse(await readFile(join(sourceDirectory, '..', 'package.json'), 'utf8'));
  const absoluteAppPath = resolve(appPath);
  if (!absoluteAppPath.endsWith('.app')) throw new Error('Installer output must end with .app.');
  const contents = join(absoluteAppPath, 'Contents');
  const macOS = join(contents, 'MacOS');
  const resources = join(contents, 'Resources');
  await mkdir(macOS, { recursive: true });
  await mkdir(resources, { recursive: true });
  if (resourcesSource !== undefined) {
    const absoluteResources = resolve(resourcesSource);
    for (const relative of ['installer/installer.mjs', 'installer/vendor/yaml', 'runtime']) {
      await access(join(absoluteResources, relative));
    }
    await cp(absoluteResources, resources, { recursive: true, dereference: true });
  }

  const executablePath = join(macOS, 'AIYOUDSHInstaller');
  const target = `${swiftArch}-apple-macos${minimumSystemVersion}`;
  await execute('/usr/bin/xcrun', [
    'swiftc', '-swift-version', '5', '-O', '-whole-module-optimization', '-target', target,
    '-framework', 'AppKit', join(sourceDirectory, 'Installer.swift'), '-o', executablePath,
  ], { maxBuffer: 4 * 1024 * 1024 });

  const infoPath = join(contents, 'Info.plist');
  await writeFile(infoPath, `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>CFBundleName</key><string>AIYOUDSH</string>
  <key>CFBundleDisplayName</key><string>AIYOUDSH 增强安装器</string>
  <key>CFBundleIdentifier</key><string>cn.aiyou.harness.enhancer.installer</string>
  <key>CFBundleExecutable</key><string>AIYOUDSHInstaller</string>
  <key>CFBundlePackageType</key><string>APPL</string>
  <key>CFBundleShortVersionString</key><string>${version}</string>
  <key>CFBundleVersion</key><string>1</string>
  <key>LSMinimumSystemVersion</key><string>${minimumSystemVersion}</string>
  <key>NSPrincipalClass</key><string>NSApplication</string>
  <key>NSHighResolutionCapable</key><true/>
  <key>LSUIElement</key><false/>
</dict></plist>
`);
  await execute('/usr/bin/plutil', ['-lint', infoPath]);
  const { stdout } = await execute('/usr/bin/file', [executablePath]);
  if (!stdout.includes('Mach-O') || !stdout.includes(swiftArch)) throw new Error('The compiled installer is not the requested Mach-O architecture.');
  const { stdout: architectures } = await execute('/usr/bin/lipo', ['-archs', executablePath]);
  if (architectures.trim() !== swiftArch) throw new Error(`Installer architecture mismatch: expected ${swiftArch}, received ${architectures.trim()}.`);
  const architecture = { arm64: 'arm64', x86_64: 'x64' }[architectures.trim()];
  return { appPath: absoluteAppPath, executablePath, infoPath, resourcesPath: resources, architecture };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const positional = [], options = {};
  const args = process.argv.slice(2);
  for (let index = 0; index < args.length; index++) {
    if (args[index] === '--arch' && options.arch === undefined && args[index + 1] && !args[index + 1].startsWith('--')) options.arch = args[++index];
    else if (args[index].startsWith('--')) throw new Error('Usage: node installer-ui/build.mjs <output.app> [resources-source] [--arch arm64|x64]');
    else positional.push(args[index]);
  }
  if (!positional.length || positional.length > 2) throw new Error('Usage: node installer-ui/build.mjs <output.app> [resources-source] [--arch arm64|x64]');
  process.stdout.write(`${JSON.stringify(await buildInstaller(positional[0], positional[1], options))}\n`);
}
