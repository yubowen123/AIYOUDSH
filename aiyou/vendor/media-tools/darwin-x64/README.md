# Intel Mac media tools

This directory contains unmodified x86_64 FFmpeg and FFprobe 6.1.1-tessus binaries, retrieved from the pinned eugeneware/ffmpeg-static b6.1.1 GitHub release. Original executable and compressed-archive SHA256 values are recorded in provenance.json and independently pinned in test/native-media-targets.test.mjs.

The third-party codecs are linked statically. Both executables load only /usr/lib and /System/Library system libraries, with no Homebrew or /usr/local dependency. Mach-O declares macOS 10.13; this is a binary deployment declaration, not a claim that the full AIYOUDSH application supports that macOS version.

The existing darwin-arm64 payload is a separate FFmpeg 8.1 build. The Intel payload intentionally records its own 6.1.1 version and does not claim version parity. Runtime selection uses process.platform and process.arch.

## Source and license

The FFmpeg official download page links the original builder at https://evermeet.cx/ffmpeg/. The pinned redistributor download script explicitly selects evermeet 6.1.1 binaries. It also fetches floating release metadata and a HEAD license summary, so its attached darwin-x64.README describes 8.0. The unchanged upstream README and summary are retained under clearly labeled names. They are not used to identify the actual executables or their licensing.

Actual version, buildconf and license output are under licenses/. --enable-gpl and --enable-version3 are enabled; --enable-nonfree is absent. These binaries are distributed under GPL-3.0-or-later. The GPL/LGPL license texts and LICENSE.md are copied from the exact FFmpeg n6.1.1 source tag: https://github.com/FFmpeg/FFmpeg/tree/n6.1.1. The builder's exact 6.1.1 metadata records external-library versions and their source-project URLs in licenses/evermeet-ffmpeg-6.1.1.json and licenses/evermeet-ffprobe-6.1.1.json. No local binary or source patch was made; this is not a locally reproduced source build.

This software is based in part on the work of the Independent JPEG Group. See licenses/LICENSE.md for the upstream terms and acknowledgements. License terms for this media payload are separate from the main application's MIT declaration.

## Verification boundary

Both executables were inspected with file, lipo and otool -L, then executed with arch -x86_64 under Rosetta on Apple Silicon, with PATH restricted to macOS system directories and no DYLD overrides. The actual frozen canvas local-media module passed video trim, audio extraction and image montage operations; a spatial video crop also passed. All outputs were decoded with the Intel FFmpeg and probed with Intel FFprobe. Audio was non-silent and both montage source colors were verified in decoded pixels. No model, supplier API or paid generation was used. Physical Intel Mac GUI acceptance remains a separate check.
