import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

test('Intel FFmpeg runs all ten canvas media operations', {
  skip: process.platform !== 'darwin' || process.arch !== 'x64' ? 'Requires native macOS x64 media payload execution' : false,
  timeout: 120000,
}, async t => {
  const directory = await mkdtemp(path.join(tmpdir(), 'aiyoudsh-intel-media-'));
  const ffmpegPath = fileURLToPath(new URL('../aiyou/vendor/media-tools/darwin-x64/bin/ffmpeg', import.meta.url));
  const ffprobePath = path.join(path.dirname(ffmpegPath), 'ffprobe');
  const { tryHandleLocalMediaCommand } = createRequire(import.meta.url)('../aiyou/vendor/aiyouplus-canvas/node/aiyouplus-local-media.cjs');
  const active = new Set();
  const context = { ffmpegPath, ffprobePath, mediaTimeoutMs: 30000, onMediaProcess: e => e.phase === 'start' ? active.add(e.pid) : active.delete(e.pid) };
  const report = { platform: process.platform, arch: process.arch, node: process.version, checks: [], modelRequests: 0, supplierVideoRequests: 0 };
  const run = (tool, args) => execFileSync(tool, args, { timeout: 30000, maxBuffer: 8 * 1024 * 1024 });
  const base = ['-hide_banner', '-v', 'error', '-nostdin', '-protocol_whitelist', 'file,pipe'];
  const ffmpeg = args => run(ffmpegPath, [...base, ...args]);
  const probe = file => JSON.parse(run(ffprobePath, ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', file]));
  const stream = (data, type) => data.streams.find(s => s.codec_type === type);
  const near = (value, expected, tolerance = 0.08) => assert.ok(Math.abs(value - expected) <= tolerance, `${value} should be near ${expected}`);
  const output = name => path.join(directory, name);
  async function media(name, args) {
    const result = await tryHandleLocalMediaCommand(`aiyouplus_media_${name}`, args, context);
    assert.equal(result.handled, true); return result.value;
  }
  function decoded(file) {
    ffmpeg(['-i', file, '-map', '0', '-f', 'null', '-']);
    return probe(file);
  }
  function color(file, expected, time, x, y) {
    const v = stream(probe(file), 'video');
    const raw = ffmpeg([...(time === undefined ? [] : ['-ss', String(time)]), '-i', file, '-map', '0:v:0', '-frames:v', '1', '-f', 'rawvideo', '-pix_fmt', 'rgb24', 'pipe:1']);
    assert.equal(raw.length, v.width * v.height * 3);
    const at = ((y ?? Math.floor(v.height / 2)) * v.width + (x ?? Math.floor(v.width / 2))) * 3;
    const pixel = [...raw.subarray(at, at + 3)];
    pixel.forEach((value, i) => near(value, expected[i], 25)); return pixel;
  }
  function audio(file) { return ffmpeg(['-i', file, '-map', '0:a:0', '-ac', '1', '-ar', '8000', '-f', 'f32le', 'pipe:1']); }
  function tone(raw, frequency, start = 0.1, end = 0.3) {
    const samples = raw.subarray(Math.round(start * 8000) * 4, Math.round(end * 8000) * 4);
    assert.ok(samples.length > 0); let sum = 0, crossings = 0, previous = samples.readFloatLE(0);
    for (let i = 0; i < samples.length; i += 4) { const sample = samples.readFloatLE(i); sum += sample * sample; if (previous <= 0 && sample > 0) crossings++; previous = sample; }
    const rms = Math.sqrt(sum / (samples.length / 4)), measuredHz = crossings / (samples.length / 4 / 8000);
    assert.ok(rms > 0.01, 'Decoded audio must contain the synthesized tone'); near(measuredHz, frequency, 20);
    return { rms, measuredHz };
  }
  async function check(name, fn) {
    await t.test(name, async () => {
      try { report.checks.push({ name, pass: true, ...await fn() }); }
      catch (error) { report.checks.push({ name, pass: false, error: error.stack }); throw error; }
    });
  }
  try {
    report.ffmpegVersion = run(ffmpegPath, ['-version']).toString().split('\n')[0];
    const video = output('red-blue-sine.mp4'), red = output('red.png'), green = output('green.png'), duo = output('duo.png'), second = output('880hz.wav');
    ffmpeg(['-f', 'lavfi', '-i', 'color=c=red:s=160x90:r=24:d=0.5', '-f', 'lavfi', '-i', 'color=c=blue:s=160x90:r=24:d=0.5', '-f', 'lavfi', '-i', 'sine=frequency=440:sample_rate=48000:duration=1', '-filter_complex', '[0:v][1:v]concat=n=2:v=1:a=0[v]', '-map', '[v]', '-map', '2:a:0', '-c:v', 'libx264', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-t', '1', video]);
    for (const [name, file] of [['red', red], ['lime', green]]) ffmpeg(['-f', 'lavfi', '-i', `color=c=${name}:s=80x60:d=1`, '-frames:v', '1', '-update', '1', file]);
    ffmpeg(['-i', red, '-i', green, '-filter_complex', 'hstack=inputs=2', '-frames:v', '1', '-update', '1', duo]);
    ffmpeg(['-f', 'lavfi', '-i', 'sine=frequency=880:sample_rate=48000:duration=1', second]);
    decoded(video);
    await check('probe', async () => {
      const value = await media('probe', { inputPath: video });
      assert.equal(value.kind, 'video'); assert.deepEqual([value.width, value.height, value.fps], [160, 90, 24]); assert.equal(value.hasAudio, true); near(value.duration, 1);
      return { dimensions: [value.width, value.height], seconds: value.duration, hasAudio: value.hasAudio };
    });
    await check('video_analyze', async () => {
      const value = await media('video_analyze', { inputPath: video, outputDir: output('analysis'), sampleCount: 2, sceneThreshold: 0.1, minSceneSeconds: 0.2 });
      assert.equal(value.frames.length, 2); assert.equal(value.scenes.length, 2); near(value.scenes[0].end, 0.5); near(value.scenes[1].end, 1);
      value.frames.forEach(frame => decoded(frame.path));
      return { sceneBoundaries: value.scenes.map(s => [s.start, s.end]), framePixels: [color(value.frames[0].path, [255, 0, 0]), color(value.frames[1].path, [0, 0, 255])] };
    });
    await check('thumbnail', async () => {
      const value = await media('thumbnail', { inputPath: video, outputPath: output('thumbnail.png'), time: 0.75, width: 80 });
      const data = decoded(value.path); assert.deepEqual([stream(data, 'video').width, stream(data, 'video').height], [80, 45]);
      return { dimensions: [80, 45], pixel: color(value.path, [0, 0, 255]) };
    });
    await check('video_trim', async () => {
      const value = await media('video_trim', { inputPath: video, outputPath: output('trim.mp4'), startSeconds: 0.5, durationSeconds: 0.5 });
      const data = decoded(value.path); near(Number(data.format.duration), 0.5); assert.ok(stream(data, 'audio'));
      return { seconds: Number(data.format.duration), pixel: color(value.path, [0, 0, 255], 0.25), audio: tone(audio(value.path), 440) };
    });
    await check('video_convert', async () => {
      const value = await media('video_convert', { inputPath: video, outputPath: output('convert.mp4'), width: 80, height: 48, fps: 12, includeAudio: false });
      const data = decoded(value.path), v = stream(data, 'video'); assert.deepEqual([v.width, v.height, v.avg_frame_rate], [80, 48, '12/1']); assert.equal(stream(data, 'audio'), undefined); near(Number(data.format.duration), 1);
      return { dimensions: [v.width, v.height], fps: v.avg_frame_rate, pixel: color(value.path, [0, 0, 255], 0.75) };
    });
    const extracted = output('extract.wav');
    await check('audio_extract', async () => {
      const value = await media('audio_extract', { inputPath: video, outputPath: extracted, sampleRate: 48000, channels: 2 });
      const data = decoded(value.path), a = stream(data, 'audio'); assert.equal(stream(data, 'video'), undefined); assert.deepEqual([a.sample_rate, a.channels], ['48000', 2]); near(Number(data.format.duration), 1);
      return { seconds: Number(data.format.duration), ...tone(audio(value.path), 440) };
    });
    await check('audio_trim', async () => {
      const value = await media('audio_trim', { inputPath: extracted, outputPath: output('trim.mp3'), startSeconds: 0.25, durationSeconds: 0.5, sampleRate: 24000, channels: 1 });
      const data = decoded(value.path), a = stream(data, 'audio'); assert.deepEqual([a.codec_name, a.sample_rate, a.channels], ['mp3', '24000', 1]); near(Number(data.format.duration), 0.5, 0.12);
      return { seconds: Number(data.format.duration), ...tone(audio(value.path), 440) };
    });
    await check('audio_merge', async () => {
      const value = await media('audio_merge', { inputPaths: [extracted, second], outputPath: output('merge.wav'), sampleRate: 24000, channels: 1 });
      const data = decoded(value.path), raw = audio(value.path); near(Number(data.format.duration), 2); assert.equal(stream(data, 'audio').channels, 1);
      return { seconds: Number(data.format.duration), firstTone: tone(raw, 440), secondTone: tone(raw, 880, 1.1, 1.3) };
    });
    await check('image_transform', async () => {
      const value = await media('image_transform', { inputPath: duo, outputPath: output('transform.png'), crop: { x: 80, y: 0, width: 80, height: 60 }, width: 40, height: 30, rotation: 90 });
      const data = decoded(value.path), v = stream(data, 'video'); assert.deepEqual([v.width, v.height], [30, 40]);
      return { dimensions: [v.width, v.height], selectedSourcePixel: color(value.path, [0, 255, 0]) };
    });
    await check('image_montage', async () => {
      const value = await media('image_montage', { inputPaths: [red, green], outputPath: output('montage.png'), columns: 2, cellWidth: 80, cellHeight: 60, gap: 4, background: '#0000FF' });
      const data = decoded(value.path), v = stream(data, 'video'); assert.deepEqual([v.width, v.height], [164, 60]);
      return { dimensions: [v.width, v.height], pixels: [color(value.path, [255, 0, 0], undefined, 40, 30), color(value.path, [0, 0, 255], undefined, 82, 30), color(value.path, [0, 255, 0], undefined, 124, 30)] };
    });
    report.pass = report.checks.length === 10 && report.checks.every(check => check.pass);
    assert.equal(report.pass, true); assert.equal(active.size, 0, 'All media child processes must exit');
  } finally {
    await rm(directory, { recursive: true, force: true }); report.temporaryDirectoryRemoved = true; report.activeMediaProcesses = [...active];
    if (process.env.DSH_NATIVE_MEDIA_REPORT) { await mkdir(path.dirname(process.env.DSH_NATIVE_MEDIA_REPORT), { recursive: true }); await writeFile(process.env.DSH_NATIVE_MEDIA_REPORT, JSON.stringify(report, null, 2) + '\n'); }
  }
});
