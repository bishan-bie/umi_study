var hkey_root, hkey_path, hkey_key;
    hkey_root = "HKEY_CURRENT_USER";
    hkey_path = "\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
 
//设置网页打印的页眉页脚为空
function pagesetup_null() {
    try {
        var RegWsh = new ActiveXObject("WScript.Shell");
        hkey_key = "header";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
        hkey_key = "footer";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
    } catch (e) {
    }
}
 
//设置网页打印的页眉页脚为默认值
function pagesetup_default() {
    try {
        var RegWsh = new ActiveXObject("WScript.Shell")
        hkey_key = "header";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "&w&b页码，&p/&P")
        hkey_key = "footer";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "&u&b&d")
    } catch (e) {
    }
}
function printpr(target) //预览函数
{
    pagesetup_null();//预览之前去掉页眉，页脚

    var WebBrowser = '<OBJECT ID="WebBrowser1" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';
    document.body.insertAdjacentHTML('beforeEnd', WebBrowser);//在body标签内加入html（WebBrowser activeX控件）
    target.ExecWB(7, 1); //打印预览
    WebBrowser.outerHTML = "";//从代码中清除插入的html代码
    pagesetup_default();//预览结束后页眉页脚恢复默认值
}
function print(target) //打印函数
{
    pagesetup_null();//打印之前去掉页眉，页脚

    var WebBrowser = '<OBJECT ID="WebBrowser1" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';
    document.body.insertAdjacentHTML('beforeEnd', WebBrowser);//在body标签内加入html（WebBrowser activeX控件）
    target.ExecWB(6, 1); //打印
    WebBrowser.outerHTML = "";//从代码中清除插入的html代码
    pagesetup_default();//打印结束后页眉页脚恢复默认值
}

export {
    pagesetup_null,
    pagesetup_default,
    printpr,
    print
}