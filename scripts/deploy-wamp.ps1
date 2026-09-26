$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$distPath = Join-Path $projectRoot 'dist'

if (-not (Test-Path (Join-Path $distPath 'index.html'))) {
    throw 'The production build was not found. Run npm run build first.'
}

Copy-Item (Join-Path $distPath 'index.html') (Join-Path $projectRoot 'index.html') -Force

foreach ($folder in @('assets', 'members')) {
    $source = Join-Path $distPath $folder
    $destination = Join-Path $projectRoot $folder

    if (Test-Path $source) {
        New-Item -ItemType Directory -Path $destination -Force | Out-Null
        Copy-Item (Join-Path $source '*') $destination -Recurse -Force
    }
}

Write-Host 'RACGU production build deployed to the WAMP document root.' -ForegroundColor Green
Write-Host 'Open http://racgu.local and press Ctrl+F5.' -ForegroundColor Cyan
