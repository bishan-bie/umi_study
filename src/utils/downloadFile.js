const downloadFile = function(url, fileName) {
    var request = new XMLHttpRequest();
    request.responseType = "blob";//定义响应类型
    request.open("GET", url);
    request.onload = function () {
        var url = window.URL.createObjectURL(this.response);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = fileName
        a.click();
    }
    request.send();
}

export default downloadFile;