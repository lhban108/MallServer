# MallServer

# 1、Studio 3T 破解方法：
  新建一个studio3t.bat 的文件，复制粘贴以下内容

  @echo off

  ECHO 重置Studio 3T的使用日期......

  FOR /f "tokens=1,2,* " %%i IN ('reg query "HKEY_CURRENT_USER\Software\JavaSoft\Prefs\3t\mongochef\enterprise" ^| find /V "installation" ^| find /V "HKEY"') DO ECHO yes | reg add "HKEY_CURRENT_USER\Software\JavaSoft\Prefs\3t\mongochef\enterprise" /v %%i /t REG_SZ /d ""

  ECHO 重置完成, 按任意键退出......
  pause>nul

  exit

  运行即可