$ErrorActionPreference = "Stop"
$packageRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$runtime = Join-Path $packageRoot "runtime\zhihu_knowledge.py"

python $runtime demo --project-key ZHIHU-DEMO-001
if ($LASTEXITCODE -ne 0) { throw "Demo initialization failed." }

Write-Host "Starting the local web app. Press Ctrl+C to stop."
python $runtime serve --project-key ZHIHU-DEMO-001 --open
