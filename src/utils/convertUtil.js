export function Params2Url(params){
    let stringify = [], key;
	for (key in params) {
        stringify.push(key + "=" + params[key]);
    }
    return stringify.join('&');
}

export function Str2Params(str){
	let o = {};
	str && [...str.split('&')].map((item, i)=>{
		const v = item.split('=');
		o[v[0]] = v[1];
	});
	return o;
}

export function toDecimal(x) {
	var f = parseFloat(x);
	if (isNaN(f)) {
		return;
	}
	f = Math.round(x*100)/100;
	return f;
}

export function toDecimal2(x) {
	let f = parseFloat(x);
	if (isNaN(f)) return false;
	f = Math.round(x*100)/100;
	var s = f.toString();
	var rs = s.indexOf('.');
	if (rs < 0) {
		rs = s.length;
		s += '.';
	}
	while (s.length <= rs + 2) {
		s += '0';
	}
	return s;
}

export function fomatFloat(src,pos){
	return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
}

//全角字符转半角字符: 除了空格外，其他的字符中，全角与半角均相差：0xFFE0
export function DBC2CDB(source){
	if(!source){
		return source;
	}
	let str = '';
	for(let i = 0, len = source.length;i < len;i++){
		let charCode = source.charCodeAt(i);
		//全角与半角相差（除空格外）：65248（十进制）
		if(charCode >= 65281 && charCode <= 65374){
			charCode = charCode - 65248;
		}else if(charCode == 12288){
			//处理空格
			charCode = 32;
		}
		str += String.fromCharCode(charCode);
	}

	return str;
}

const trimReg = /(^\s*)|(\s*$)/g;
export function trim(str){
	if(!str){
		return str;
	}else{
		return str.replace(trimReg, '');
	}
}