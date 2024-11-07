@echo off
echo Creating project structure...

:: Създаване на основната директория
mkdir backend
cd backend

:: Backend структура
mkdir src
cd src
mkdir config controllers models middlewares routes types utils
cd ..

:: Admin UI структура
mkdir admin
cd admin
mkdir src
cd src
mkdir components resources types
cd components
mkdir charts
cd ..
cd ..
cd ..
cd ..

:: Frontend директория
mkdir frontend
cd frontend
mkdir src
cd src
mkdir components pages services assets hooks contexts styles utils
cd ..
cd ..

:: Общи директории
mkdir shared
mkdir database
mkdir documentation
mkdir testing
mkdir Changes

echo Project structure created successfully!
pause 