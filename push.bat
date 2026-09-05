@echo off
echo Pushing to labtech (labtech001)...
"C:\Program Files\Git\cmd\git.exe" push -u labtech main
echo.
echo Pushing to origin (Karr-lab01) for Vercel deployment...
"C:\Program Files\Git\cmd\git.exe" push -u origin main
echo.
echo Done! Both remotes updated.
pause
