const isEmpty = value => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */ ];
const chineseReg = /[\u4e00-\u9fa5]/g;
function getStringLength(str){
  let len = 0;
  if(str || str === 0){
    str = String(str);
    len = str.length;
    let chineseMatchResult = str.match(chineseReg);
    if(chineseMatchResult){
      len += 2 * chineseMatchResult.length;
    }
    return len;
  }
    
}
const projectNumberReg = /[^a-zA-Z0-9\-—\u4e00-\u9fa5]/;
export function validateProjectNumber(value){
  let errorMsg;
  if(projectNumberReg.test(value)){
    errorMsg = '只允许字母、数字、汉字、-、—';
  }else if(value && getStringLength(value) > 40){
    errorMsg = '不能超过40个字符（每个中文算3个字符）';
  }
  return errorMsg;
}

export function email(value) {
  // Let's not start a de`bate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return '此处必填！';
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
  };
}

export function zhEn (value) {
  const flag = /^[\u0391-\uFFE5]|[a-zA-Z]+$/.test(value);
  if(!flag){
    return '请输入中文或英文，不能包含数字和其他特殊字符！';
  }
}

export function zhEnNumber(value) {
  const flag = /^[\u0391-\uFFE5]|[a-zA-Z]|[0-9]+$/.test(value);
  if(!flag){
    return "请输入中文、英文、数字，不支持特殊字符！";
  }
}

export function mobile(value) {
  const flag = /^0?1[3|4|5|8][0-9]\d{8}$/.test(value);
  if(!flag){
    return "请输入正确的手机号码！";
  }
}

export function number(value) {
  const flag = /^\d+$/.test(value);
  if(!flag){
    return "请输入数字！";
  }
}

export function tel(value) {
  const flag = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(value);
  if(!flag){
    return "例如：区号-电话号码-分机号(010-1234567-123)";
  }
}

export function eUser(value) {
  const flag = /^[\u0391-\uFFE5\w]+$/.test(value);
  if(!flag){
    return "名称只允许汉字、英文字母、数字及下划线。";
  }
}
let priceReg = /^\+?(\d+(\.\d{0,2})?)$/;
export function priceValidate(value, allowZero, allowEmpty){
    if(!value && allowEmpty){
        return '';
    }else if(value == 0 && !allowZero){
        return '请输入大于0的金额';
    }else{
        return priceReg.test(value) ? '' : '请输入数字, 且小数点后至多2位';
    }
}

export function toDecimal2(value) {
  if(!Number.isInteger(value)) {
    const flag = /*/^\+?(\d*\.\d{2})$/*/priceReg.test(value);
    if(!flag) {
      return "请输入数字后面保留两位小数；例如：100.23";
    }
  }
}

export function safepass(value) {
  const flag = /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/.test(value);
  if(!flag){
    return "密码由字母和数字组成，至少6位";
  }
}

export function idCard(value) {
  const flag = () => {
    if (value.length == 18 && 18 != value.length) return false;
    var number = value.toLowerCase();
    var d, sum = 0, v = '10x98765432', w = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], a = '11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91';
    var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/);
    if (re == null || a.indexOf(re[1]) < 0) return false;
    if (re[2].length == 9) {
      number = number.substr(0, 6) + '19' + number.substr(6);
      d = ['19' + re[4], re[5], re[6]].join('-');
    } else d = [re[9], re[10], re[11]].join('-');
    if (!isDateTime.call(d, 'yyyy-MM-dd')) return false;
    for (var i = 0; i < 17; i++) sum += number.charAt(i) * w[i];
    return (re[2].length == 9 || number.charAt(17) == v.charAt(sum % 11));
  }
  if(!flag) {
    return "请输入正确的身份证号码";
  }
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}

export function checkPhone(mobile) {
  if(!mobile)return false;
  var tel = /^0\d{2,3}-?\d{7,8}$/;
  var phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
  if(mobile.length == 11){//手机号码
    if(phone.test(mobile)) {
      console.log(mobile);
      return true;
    }
  }else if((mobile.length == 12 || mobile.length == 13) && mobile.indexOf("-") != -1 ){//电话号码
    if(tel.test(mobile)) {
      console.log(mobile);
      return true;
    }
  }else if(mobile.length == 10){
    if(mobile.startsWith("400")){
      return true;
    }
  }
    return false;
}

export function checkEmail(emailValue){
  if(!emailValue)return false;
  if (emailValue.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)return true;
  return false;
}

export function checkFileExt(name){
  if(!name)return "";
  const idx = name.lastIndexOf('.');
  return name.substring(idx, name.length);
}