@echo off
echo Creating environment files...

:: Backend .env
(
echo NODE_ENV=development
echo PORT=3000
echo JWT_SECRET=pm_tool_secret_key
echo ADMIN_USERNAME=TooEaZy
echo ADMIN_EMAIL=TooEaZy@example.com
echo ADMIN_PASSWORD=123qwe!
) > backend\.env

:: Admin UI .env
(
echo VITE_API_URL=http://localhost:3000/api
echo VITE_ADMIN_URL=http://localhost:3001
) > backend\admin\.env

:: Frontend .env
(
echo VITE_API_URL=http://localhost:3000/api
echo VITE_ADMIN_URL=http://localhost:3001
) > frontend\.env

echo Environment files created!
pause 