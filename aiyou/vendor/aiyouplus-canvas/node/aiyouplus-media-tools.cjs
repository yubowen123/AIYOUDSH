'use strict';
const path = require('node:path');

// Executables must remain outside app.asar so the OS can load their libraries.
function bundledMediaCandidates(name) {
  if (!['ffmpeg', 'ffprobe'].includes(name)) return [];
  const executable = process.platform === 'win32' ? name + '.exe' : name;
  return [
    ...(process.resourcesPath ? [path.join(process.resourcesPath, 'media-tools', 'bin', executable)] : []),
    path.resolve(__dirname, '../../resources/media-tools/bin', executable),
  ];
}
module.exports = { bundledMediaCandidates };
