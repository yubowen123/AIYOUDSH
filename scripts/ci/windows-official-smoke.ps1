[CmdletBinding()]
param(
    [string]$Runtime,
    [string]$ReportPath
)
$ErrorActionPreference = 'Stop'
if ($env:OS -ne 'Windows_NT') { throw 'The official Windows smoke check must run on Windows.' }
$repository = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..'))
if (-not $Runtime) { $Runtime = Join-Path $repository 'dist\windows\AIYOUDSH\runtime' }
if (-not $ReportPath) { $ReportPath = Join-Path $repository 'dist\windows-official-smoke.json' }
$baselineFile = Join-Path $repository 'platforms\win32-x64.json'
$baseline = Get-Content -LiteralPath $baselineFile -Raw | ConvertFrom-Json
if ($baseline.platform -ne 'win32-x64' -or $baseline.sourceUrl -notmatch '^https://download\.deepseek\.com/') { throw 'The pinned Windows baseline is invalid.' }
$temporary = Join-Path ([System.IO.Path]::GetTempPath()) ('AIYOUDSH official smoke ' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $temporary -Force | Out-Null
try {
    $download = Join-Path $temporary 'official-installer.exe'
    Invoke-WebRequest -Uri $baseline.sourceUrl -OutFile $download
    if ((Get-Item -LiteralPath $download).Length -ne [long]$baseline.archiveSize) { throw 'The official installer size differs from the pinned baseline.' }
    $hash = (Get-FileHash -LiteralPath $download -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($hash -ne $baseline.archiveSha256) { throw 'The official installer SHA-256 differs from the pinned baseline.' }
    $sevenZip = (Get-Command '7z.exe' -ErrorAction SilentlyContinue).Source
    if (-not $sevenZip) { $sevenZip = Join-Path $env:ProgramFiles '7-Zip\7z.exe' }
    if (-not (Test-Path -LiteralPath $sevenZip -PathType Leaf)) { throw '7-Zip is required to inspect the official NSIS package.' }
    $outer = Join-Path $temporary 'outer'
    & $sevenZip x $download '$PLUGINSDIR/app-64.7z' ('-o' + $outer) '-y' | Out-Null
    if ($LASTEXITCODE -ne 0) { throw 'The official NSIS archive could not be inspected.' }
    $payload = Join-Path $outer '$PLUGINSDIR\app-64.7z'
    if (-not (Test-Path -LiteralPath $payload -PathType Leaf)) { throw 'The official x64 application payload is absent.' }
    $application = Join-Path $temporary 'official application'
    & $sevenZip x $payload ('-o' + $application) '-y' | Out-Null
    if ($LASTEXITCODE -ne 0) { throw 'The official x64 application payload could not be extracted.' }
    & node (Join-Path $PSScriptRoot 'windows-official-smoke.mjs') '--app' $application '--runtime' $Runtime '--baseline' $baselineFile '--installer' $download '--work-root' $temporary '--report' $ReportPath
    if ($LASTEXITCODE -ne 0) { throw 'The isolated official-application smoke check failed.' }
} finally {
    # Only this invocation's generated directory is removed. The official
    # application is never installed, and no user desktop profile is selected.
    if (Test-Path -LiteralPath $temporary) { Remove-Item -LiteralPath $temporary -Recurse -Force }
}
