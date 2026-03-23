# Fix setup.ps1 - rewrite to be portable
Write-Host "Setting up Hackathon Platform..." -ForegroundColor Cyan

# Install server dependencies
Write-Host "`nInstalling server dependencies..." -ForegroundColor Yellow
Set-Location -Path "$PSScriptRoot/server"
npm install

# Install client dependencies
Write-Host "`nInstalling client dependencies..." -ForegroundColor Yellow
Set-Location -Path "$PSScriptRoot/client"
npm install

Write-Host "`nSetup complete!" -ForegroundColor Green
Write-Host "Run 'npm run dev' in both /server and /client to start." -ForegroundColor Cyan
