[CmdletBinding()]
param(
    [string]$OutputDirectory = (Join-Path $PSScriptRoot '..\dist\windows\AIYOUDSH'),
    [string]$ResourcesSource,
    [switch]$SelfTest,
    [string]$ScreenshotPath
)
$ErrorActionPreference = 'Stop'
if ($env:OS -ne 'Windows_NT') { throw 'The WinForms installer must be built on Windows.' }
$compilers = @(
    (Join-Path $env:WINDIR 'Microsoft.NET\Framework64\v4.0.30319\csc.exe'),
    (Join-Path $env:WINDIR 'Microsoft.NET\Framework\v4.0.30319\csc.exe')
)
$compiler = $compilers | Where-Object { Test-Path -LiteralPath $_ -PathType Leaf } | Select-Object -First 1
if (-not $compiler) { throw 'The Windows .NET Framework C# compiler was not found. Enable .NET Framework 4.8.' }
$output = [System.IO.Path]::GetFullPath($OutputDirectory)
New-Item -ItemType Directory -Path $output -Force | Out-Null
$executable = Join-Path $output 'AIYOUDSHInstaller.exe'
$compilerArgs = @(
    '/nologo', '/target:winexe', '/platform:anycpu', '/optimize+', '/utf8output',
    '/codepage:65001', '/warn:4',
    ('/out:' + $executable),
    ('/win32manifest:' + (Join-Path $PSScriptRoot 'installer.manifest')),
    '/reference:System.dll', '/reference:System.Core.dll', '/reference:System.Drawing.dll',
    '/reference:System.Windows.Forms.dll', '/reference:System.Web.Extensions.dll',
    (Join-Path $PSScriptRoot 'Installer.cs')
)
& $compiler @compilerArgs
if ($LASTEXITCODE -ne 0 -or -not (Test-Path -LiteralPath $executable -PathType Leaf)) { throw 'The Windows installer did not compile.' }
if ($ResourcesSource) {
    $resources = [System.IO.Path]::GetFullPath($ResourcesSource)
    foreach ($entry in @('installer\installer.mjs', 'installer\vendor\yaml', 'runtime\manifest.json')) {
        if (-not (Test-Path -LiteralPath (Join-Path $resources $entry))) { throw 'The installer resources are incomplete.' }
    }
    foreach ($entry in @('installer', 'runtime')) {
        $source = Join-Path $resources $entry
        $destination = Join-Path $output $entry
        if ([System.IO.Path]::GetFullPath($source) -ne [System.IO.Path]::GetFullPath($destination)) {
            # Replace only the two owned payload directories, so an upgrade never keeps retired modules.
            if (Test-Path -LiteralPath $destination) { Remove-Item -LiteralPath $destination -Recurse -Force }
            Copy-Item -LiteralPath $source -Destination $destination -Recurse -Force
        }
    }
}
foreach ($entry in @('install.ps1', 'uninstall.ps1', '安装.cmd', '卸载.cmd')) {
    Copy-Item -LiteralPath (Join-Path $PSScriptRoot $entry) -Destination (Join-Path $output $entry) -Force
}

# Start-Process joins ArgumentList on Windows PowerShell; use the Windows argv rules explicitly.
function ConvertTo-WindowsArgument([string]$Value) {
    if ($null -eq $Value -or $Value.Contains([char]0)) { throw 'Invalid process argument.' }
    $builder = New-Object System.Text.StringBuilder
    [void]$builder.Append('"')
    $slashes = 0
    foreach ($character in $Value.ToCharArray()) {
        if ($character -eq '\') { $slashes++; continue }
        if ($character -eq '"') { [void]$builder.Append(('\' * ($slashes * 2 + 1))); [void]$builder.Append('"') }
        else { [void]$builder.Append(('\' * $slashes)); [void]$builder.Append($character) }
        $slashes = 0
    }
    [void]$builder.Append(('\' * ($slashes * 2)))
    [void]$builder.Append('"')
    return $builder.ToString()
}
if ($SelfTest) {
    $report = Join-Path $output 'windows-installer-self-test.json'
    $arguments = @('--self-test', '--result', $report) | ForEach-Object { ConvertTo-WindowsArgument $_ }
    $child = Start-Process -FilePath $executable -ArgumentList ($arguments -join ' ') -Wait -PassThru
    if ($child.ExitCode -ne 0) { throw 'Windows installer self-tests failed.' }
    $summary = Get-Content -LiteralPath $report -Raw | ConvertFrom-Json
    if ($summary.ok -ne $true -or $summary.profileTouched -ne $false) { throw 'Windows self-test result was not confirmed.' }
}
if ($ScreenshotPath) {
    $screenshot = [System.IO.Path]::GetFullPath($ScreenshotPath)
    $arguments = @('--ci-screenshot', $screenshot) | ForEach-Object { ConvertTo-WindowsArgument $_ }
    $child = Start-Process -FilePath $executable -ArgumentList ($arguments -join ' ') -Wait -PassThru
    if ($child.ExitCode -ne 0 -or -not (Test-Path -LiteralPath $screenshot -PathType Leaf)) { throw 'The CI installer screenshot could not be captured.' }
}
[pscustomobject]@{ executable = $executable; resourcesCopied = [bool]$ResourcesSource; selfTest = [bool]$SelfTest }
