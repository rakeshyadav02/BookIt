$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Starting BookIt backend and frontend..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm --prefix '$projectRoot\server' run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm --prefix '$projectRoot\client' run dev"

Write-Host "Frontend: http://localhost:3000"
Write-Host "Backend:  http://localhost:5000"
