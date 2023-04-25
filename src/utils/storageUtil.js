export function setPathStorage(path, params) {
    let pathStorage = window.sessionStorage.getItem('pathStorage') || '{}';
    pathStorage = JSON.parse(pathStorage);
    pathStorage[path] = params;
    window.sessionStorage.setItem('pathStorage', JSON.stringify(pathStorage));
}

export function getPathStorage(path) {
    let pathStorage = window.sessionStorage.getItem('pathStorage') || '{}';
    pathStorage = JSON.parse(pathStorage);
    return pathStorage[path];
}

export function clearPathStorage() {
    window.sessionStorage.setItem('pathStorage', '');
}
/*
    对于token、用户登陆信息等数据，若仅在localStorage中存储，会导致多页签登陆多个账户时，后面的把前面的挤掉进而出现问题

    为了解决上诉问题，这里采取一下措施：

        1、存储数据时，在localStorage与sessionStorage中均进行存储；
        2、获取数据时，优先从sessionStorage中获取，如果没有则从localStorage中获取
*/
export function setStorage(key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
    return window.localStorage.setItem(key, JSON.stringify(value));
}
//使用getItem方法与数组下标获取有区别：数据为空时，getItem方法会返回null，下标方式会返回undefined
//由于部分方法在获取数据后会使用JSON.parse来格式化数据，为避免代码出错，这里使用getItem方法
export function getStorage(key) {
    return window.sessionStorage.getItem(key) || window.localStorage.getItem(key);
}

export function isStorage(key) {
    return window.sessionStorage.getItem(key) || window.localStorage.getItem(key);
}

export function removeStorage(key) {
    window.sessionStorage.removeItem(key);
    return window.localStorage.removeItem(key);
}

export function clearStorage() {
	window.sessionStorage.clear();
    return window.localStorage.clear();
}

//设置cookie
export function setCookie(name,value,day){
    var date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + '=' + value + ';expires='+ date;
};
//获取cookie
export  function getCookie(name){
    var reg = RegExp(name+'=([^;]+)');
    var arr = document.cookie.match(reg);
    if(arr){
        return arr[1];
    }else{
        return '';
    }
};
  //删除cookie
export  function delCookie(name){
    setCookie(name,null,-1);
};