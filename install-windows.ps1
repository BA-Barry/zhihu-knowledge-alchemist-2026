$ErrorActionPreference = "Stop"
$packageRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$skillsSource = Join-Path $packageRoot "skills"
$skillsTarget = Join-Path $env:USERPROFILE ".codex\skills"
$officialSkillsSource = Join-Path $packageRoot ".codex\skills"
$installTarget = Join-Path $env:USERPROFILE ".agents\zhihu-knowledge-alchemist"
$runtimeTarget = Join-Path $installTarget "runtime"
$demoTarget = Join-Path $installTarget "demo"

New-Item -ItemType Directory -Path $skillsTarget -Force | Out-Null
New-Item -ItemType Directory -Path $runtimeTarget -Force | Out-Null
New-Item -ItemType Directory -Path $demoTarget -Force | Out-Null

Get-ChildItem -LiteralPath $skillsSource -Directory | ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination $skillsTarget -Recurse -Force
}
if (-not (Test-Path -LiteralPath (Join-Path $officialSkillsSource "zhihu")) -or
    -not (Test-Path -LiteralPath (Join-Path $officialSkillsSource "zhihu-hackathon"))) {
    throw "Package is missing one or more official Zhihu skills."
}
Get-ChildItem -LiteralPath $officialSkillsSource -Directory | ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination $skillsTarget -Recurse -Force
}
Get-ChildItem -LiteralPath (Join-Path $packageRoot "runtime") -Force | ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination $runtimeTarget -Recurse -Force
}
Get-ChildItem -LiteralPath (Join-Path $packageRoot "demo") -Force | ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination $demoTarget -Recurse -Force
}

Write-Host "Installed 12 Knowledge Alchemist skills and 2 official Zhihu skills."
Write-Host "Runtime: $installTarget"
Write-Host "Restart Codex, then ask it to start Zhihu knowledge alchemy."
