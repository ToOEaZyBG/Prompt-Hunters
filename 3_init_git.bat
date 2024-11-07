@echo off
echo Initializing Git repository...

:: Проверка за Git
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Git is not installed! Please install Git first.
    exit /b 1
)

:: Git init и .gitignore
git init

:: Създаване на .gitignore
(
echo # Dependencies
echo node_modules/
echo .pnp
echo .pnp.js
echo 
echo # Testing
echo coverage/
echo 
echo # Production
echo build/
echo dist/
echo 
echo # Misc
echo .DS_Store
echo .env
echo .env.local
echo .env.development.local
echo .env.test.local
echo .env.production.local
echo 
echo # Logs
echo npm-debug.log*
echo yarn-debug.log*
echo yarn-error.log*
echo 
echo # Database
echo *.sqlite
echo *.sqlite3
) > .gitignore

:: Git setup
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ToOEaZyBG/Prompt-Hunters.git
git checkout -b dev

echo Git repository initialized!
pause 