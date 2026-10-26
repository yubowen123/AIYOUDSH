# Third-party notices

## Codex Taskboard

This package includes a pinned, prebuilt customized snapshot derived from
[chuspeeism/dashi-taskboard](https://github.com/chuspeeism/dashi-taskboard),
based on commit `677b544` with the customized snapshot identified in VERSION.json.
The exact snapshot identity and included capabilities are recorded in
[`vendor/codex-taskboard/VERSION.json`](./vendor/codex-taskboard/VERSION.json).

Codex Taskboard is distributed under the Apache License 2.0. The bundled
license copy is available at
[`vendor/codex-taskboard/LICENSE`](./vendor/codex-taskboard/LICENSE).

The vendored web build also contains its own font notice at
[`vendor/codex-taskboard/dist/web/Inter-LICENSE.txt`](./vendor/codex-taskboard/dist/web/Inter-LICENSE.txt).

## Codex Workspace Enhancer asset layer

This package vendors the Asset Console service and embedded web surface from
[q2522879285-source/codex-workspace-enhancer](https://github.com/q2522879285-source/codex-workspace-enhancer),
based on commit `f41a6318fa7ddc9ebaf1e8941a842e7e0273466c`. The sidebar integration in this
repository adapts that Windows-oriented reference layer to the existing macOS
and Windows managed runtime without replacing the project-management feature.

Codex Workspace Enhancer is distributed under the MIT License. The bundled
license copy is available at
[`vendor/codex-workspace-enhancer/LICENSE`](./vendor/codex-workspace-enhancer/LICENSE).

The complete dependency and theme/media scope notices for this public distribution are
recorded in [`../THIRD_PARTY_NOTICES.md`](../THIRD_PARTY_NOTICES.md). Original
licenses for the prebuilt web dependencies are retained in
[`vendor/codex-taskboard/third-party-licenses/`](vendor/codex-taskboard/third-party-licenses/).

## AIYOUPLUS canvas and local media engines

This integration selectively ports recovered AIYOUPLUS 1.3.1 canvas source and local engines. Source identity, exact provenance and adaptation boundaries are retained in `vendor/aiyouplus-canvas/provenance.json` and its README. This does not change the ownership or media rights of the source application. No account credentials, runtime, user profile or model weights are bundled.

The macOS arm64 media tooling includes FFmpeg 8.1 and its linked codecs. Their original GPL/LGPL and other notices, build configuration, and component licenses are retained in `vendor/media-tools/darwin-arm64/licenses/`. These binary components are not relicensed under the root MIT license. Their declared minimum macOS version is 26.0; no Intel or Windows execution claim is made for these binaries.

The macOS Intel x64 payload separately includes FFmpeg/FFprobe **6.1.1-tessus**, distributed under GPL-3.0-or-later and the retained component notices in `vendor/media-tools/darwin-x64/licenses/`. Exact original binary hashes, source links, build configuration, system-only library dependencies and the upstream release metadata mismatch are recorded in `vendor/media-tools/darwin-x64/provenance.json`. It is not the arm64 8.1 payload relabeled as Intel.
