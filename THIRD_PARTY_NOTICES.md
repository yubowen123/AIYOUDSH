# Third-party notices

AIYOUDSH is an independent enhancement for DeepSeek Harness. The root [MIT
license](LICENSE) applies to AIYOUDSH's original code. It does not replace the
licenses, copyrights, media restrictions, or trademarks listed below. Original
license files remain alongside the relevant source and dependencies.

## DeepSeek Harness

The recovered UI modules and pinned test runtime come from the official
DeepSeek Harness `0.2.1-rc.2` installation, build
`332895e0f7c9d4dbfb29729f5eb367fa263ff986`. Their shipped package metadata and
license files identify **MIT, Copyright (c) 2026 DeepSeek**. The official
repository recorded in those packages is
<https://github.com/deepseek-ai/deepseek-harness>.

License copies are preserved in
[`packages/dsh-client-ui-sidebar/LICENSE`](packages/dsh-client-ui-sidebar/LICENSE),
[`packages/dsh-client-ui-workspace/LICENSE`](packages/dsh-client-ui-workspace/LICENSE),
and each relevant package under `test/runtime/node_modules/@deepseek-ai/`.
Small recovered CSS references from the chat, conversation, layout and right
sidebar use the same shipped DeepSeek MIT notice.

AIYOUDSH modifies the native sidebar and workspace integration and adds its own
modules. In this public export, inert source-region comments and recovered CSS
part filenames were also normalized to remove the original build-machine path;
upstream compatibility hashes remain recorded separately. This repository does
not contain the complete official application or its installer.

## AIYOUcodex enhancement code

The feature code is adapted from
[AIYOUCODEX](https://github.com/yubowen123/AIYOUCODEX), distributed under MIT,
Copyright (c) 2026 yubowen123. The exact supplied notice is retained at
[`aiyou/LICENSE-AIYOUCODEX`](aiyou/LICENSE-AIYOUCODEX).

## Codex Taskboard and its web dependencies

The customized, pinned Taskboard snapshot identifies its upstream as
[chuspeeism/dashi-taskboard](https://github.com/chuspeeism/dashi-taskboard) and
base commit `677b544`. Its provenance and customization summary are retained in
[`VERSION.json`](aiyou/vendor/codex-taskboard/VERSION.json). It is distributed
under the original
[Apache License 2.0](aiyou/vendor/codex-taskboard/LICENSE).

The web interface is shipped as a prebuilt snapshot, together with its editable
source and package lock. React, React DOM, React Flow, Markdown/GFM and their
transitive runtime dependencies retain their own licenses. Exact license text
was copied from the npm tarballs named by that lock file after verifying each
tarball's integrity. The LobeHub npm package omits its license text, so its
matching upstream `v1.94.0` MIT notice is included. The inventory and files are at
[`third-party-licenses/`](aiyou/vendor/codex-taskboard/third-party-licenses/).
This is a conservative dependency notice set; it may also include type-only
dependencies that are not present in the prebuilt JavaScript.

The bundled Inter font is **Copyright (c) 2016 The Inter Project Authors**, under
the SIL Open Font License 1.1. Its complete notice is retained at
[`Inter-LICENSE.txt`](aiyou/vendor/codex-taskboard/dist/web/Inter-LICENSE.txt).

## Codex Workspace Enhancer asset service

The local asset service and web surface derive from
[q2522879285-source/codex-workspace-enhancer](https://github.com/q2522879285-source/codex-workspace-enhancer),
commit `f41a6318fa7ddc9ebaf1e8941a842e7e0273466c`. Its original **MIT,
Copyright (c) 2026 yubowen123** license was restored from that exact upstream
commit and is retained at
[`aiyou/vendor/codex-workspace-enhancer/LICENSE`](aiyou/vendor/codex-workspace-enhancer/LICENSE).
The AIYOUDSH integration uses an isolated local service and the native Harness
authentication boundary.

## Vendored runtime dependencies and YAML

`test/runtime/node_modules/` is an intentional, pinned offline dependency
fixture, not a copy of a user profile. It also supplies Zod to the rebuilt
workspace module. It includes DeepSeek host libraries and the supporting npm
libraries listed in
[`THIRD_PARTY_DEPENDENCIES.json`](THIRD_PARTY_DEPENDENCIES.json). Each dependency's
original license is retained in its package directory. Licenses include MIT,
ISC and Python-2.0; the inventory links to the exact files. The pinned native
binding fixtures include both `node-addon-require-builtin-darwin-arm64` and
`node-addon-require-builtin-win32-x64-msvc` under their original MIT notices;
the matching operating system and architecture are required to execute them.

The installer's YAML dependency is
[`yaml`](addon/vendor/yaml/package.json), under the original
[ISC notice](addon/vendor/yaml/LICENSE), Copyright Eemeli Aro. It is kept
separately so installation does not require npm or a private registry.

## Theme media and site marks

Theme files and their source paths/hashes are recorded in
[`provenance.json`](aiyou/modules/theme/assets/provenance.json). The existing
mecha illustrations/video and other theme illustrations are copied from the
AIYOUcodex theme collection; two neutral SVG fallbacks are supplied instead of
private user photos. No private albums or conversation data are included.

**The code's MIT license does not grant rights in third-party characters, media,
product names or marks.** The existing CRYBABY-inspired and YOYO-inspired asset
notices are retained verbatim at
[`beach-vacation-ASSET-NOTICE.md`](aiyou/modules/theme/assets/beach-vacation-ASSET-NOTICE.md)
and
[`yoyo-tilt-collection-ASSET-NOTICE.md`](aiyou/modules/theme/assets/yoyo-tilt-collection-ASSET-NOTICE.md).
No separate character or trademark authorization is claimed by this repository.

The MOKE menu icon is the site's unchanged favicon, used to identify the linked
[MOKE website](https://www.mokeaigc.ai/). Its source notice is retained at
[`BRAND-NOTICE.md`](packages/dsh-client-ui-sidebar/src/BRAND-NOTICE.md). Website
content, services and marks remain with their respective owners.

## AIYOUPLUS canvas and local media engines

This integration selectively ports recovered AIYOUPLUS 1.3.1 canvas source and local engines. Source identity, exact provenance and adaptation boundaries are retained in `aiyou/vendor/aiyouplus-canvas/provenance.json` and its README. This does not change the ownership or media rights of the source application. No account credentials, runtime, user profile or model weights are bundled.

The macOS arm64 media tooling includes FFmpeg 8.1 and its linked codecs. Their original GPL/LGPL and other notices, build configuration, and component licenses are retained in `aiyou/vendor/media-tools/darwin-arm64/licenses/`. These binary components are not relicensed under the root MIT license. Their declared minimum macOS version is 26.0; no Intel or Windows execution claim is made for these binaries.
