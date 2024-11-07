@echo off
echo Starting development servers...

:: Убиваме всички процеси на портове 3000 и 3001 ако съществуват
FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr ":3000" 2^>nul') DO TaskKill /PID %%P /F /T 2>nul
FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr ":3001" 2^>nul') DO TaskKill /PID %%P /F /T 2>nul

:: Изчакваме малко да се освободят портовете
timeout /t 5

:: Backend
IF EXIST "backend" (
    echo Starting Backend server...
    cd backend
    start cmd /k "npm run dev"
    cd ..
    timeout /t 10
)

:: Admin UI
IF EXIST "backend\admin" (
    echo Starting Admin UI...
    cd backend\admin
    start cmd /k "npm run dev"
    cd ..\..
    timeout /t 10
)

:: Frontend
IF EXIST "frontend" (
    echo Starting Frontend...
    cd frontend
    start cmd /k "npm run dev"
    cd ..
)

echo.
echo Servers should be starting...
echo.
echo Frontend: http://localhost:5173
echo Backend: http://localhost:3000
echo Admin UI: http://localhost:3001
echo API Docs: http://localhost:3000/api-docs
echo.
echo Press any key to exit...
pause 