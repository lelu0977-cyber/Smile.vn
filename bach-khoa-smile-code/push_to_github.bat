@echo off
chcp 65001 >nul
echo ========================================================
echo   TỰ ĐỘNG ĐẨY TOÀN BỘ WEBSITE LÊN GITHUB
echo   Nha Khoa Bách Khoa Smile
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/4] Thêm tất cả thay đổi...
git add .

echo [2/4] Tạo commit mới...
git commit -m "Cap nhat website Nha khoa Bach Khoa Smile - %date% %time%"

echo [3/4] Kiểm tra nhánh main...
git branch -M main

echo [4/4] Đẩy code lên GitHub...
git push origin main

echo.
echo ========================================================
echo   ĐÃ ĐẨY LÊN GITHUB HOÀN TẤT!
echo ========================================================
pause
