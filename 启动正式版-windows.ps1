$ErrorActionPreference = "Stop"
$packageRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$runtime = Join-Path $packageRoot "runtime\zhihu_knowledge.py"

$secureSecret = Read-Host "Paste your Zhihu Access Secret" -AsSecureString
if ($secureSecret.Length -eq 0) {
    throw "Access Secret cannot be empty."
}

$secretPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureSecret)
try {
    $env:ZHIHU_ACCESS_SECRET = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($secretPointer)
    Write-Host "Starting live mode. The secret is not saved to disk."
    python $runtime serve --project-key ZHIHU-DEMO-001 --open
    if ($LASTEXITCODE -ne 0) { throw "Live mode exited with an error." }
}
finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($secretPointer)
    Remove-Item Env:ZHIHU_ACCESS_SECRET -ErrorAction SilentlyContinue
}
