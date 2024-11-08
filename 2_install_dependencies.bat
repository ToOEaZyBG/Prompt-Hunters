@echo off
echo Installing dependencies...

:: Проверка за Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed! Please install Node.js first.
    exit /b 1
)

:: Backend setup
echo Setting up backend...
cd backend
call npm init -y

:: Backend dependencies
call npm install express cors dotenv bcryptjs jsonwebtoken better-sqlite3 swagger-jsdoc swagger-ui-express
call npm install -D typescript @types/node @types/express @types/cors @types/bcryptjs @types/jsonwebtoken @types/sqlite3 @types/swagger-jsdoc @types/swagger-ui-express ts-node-dev

:: Admin UI setup
cd admin
call npm init -y
call npm install react-admin @mui/material @emotion/react @emotion/styled recharts ra-data-json-server react react-dom
call npm install -D @types/react @types/react-dom typescript @vitejs/plugin-react vite
cd ..

:: Frontend setup
cd ..\frontend
call npm create vite@latest . -- --template react-ts
call npm install
call npm install @mui/material @emotion/react @emotion/styled @reduxjs/toolkit react-redux react-router-dom axios formik yup
cd ..

echo Dependencies installed successfully!
pause 