# Run from a fully extracted AIYOUDSH Windows release directory.
[CmdletBinding()]
param()
$ErrorActionPreference = 'Stop'
$installer = Join-Path $PSScriptRoot 'AIYOUDSHInstaller.exe'
if (-not (Test-Path -LiteralPath $installer -PathType Leaf)) { throw 'AIYOUDSHInstaller.exe is missing. Extract the complete release package first.' }
$child = Start-Process -FilePath $installer -ArgumentList @('--action', 'uninstall') -Wait -PassThru
exit $child.ExitCode
