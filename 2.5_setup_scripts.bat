@echo off
echo Setting up additional scripts...

:: Създаване на package.json скриптове за backend
cd backend
call npm pkg set scripts.start="node dist/index.js"
call npm pkg set scripts.dev="ts-node-dev --respawn --transpile-only src/index.ts"
call npm pkg set scripts.build="tsc"
call npm pkg set scripts.test="jest"

:: Създаване на package.json скриптове за admin
cd admin
call npm pkg set scripts.dev="vite --port 3001"
call npm pkg set scripts.build="tsc && vite build"
call npm pkg set scripts.serve="vite preview"
cd ..

:: Създаване на tsconfig.json за backend
(
echo {
echo   "compilerOptions": {
echo     "target": "es6",
echo     "module": "commonjs",
echo     "outDir": "./dist",
echo     "rootDir": "./src",
echo     "strict": true,
echo     "esModuleInterop": true,
echo     "skipLibCheck": true,
echo     "forceConsistentCasingInFileNames": true
echo   },
echo   "include": ["src/**/*"],
echo   "exclude": ["node_modules"]
echo }
) > tsconfig.json

echo Scripts setup completed!
pause 