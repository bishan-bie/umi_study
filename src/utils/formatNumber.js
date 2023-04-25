/*
	本文件提供数值转换显示的方法
	@money2Chinese：金额转换为中文
	@number2Thousands：数值转千分位
*/
export function money2Chinese(n) {
        var fraction = ['角', '分'];
        var digit = [
            '零', '壹', '贰', '叁', '肆',
            '伍', '陆', '柒', '捌', '玖'
        ];
        var unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ];
        var head = n < 0 ? '欠' : '';
        n = Math.abs(n);
        var money2String = String(n),
            splitedMoney = money2String.split('.'),
            intPart = (splitedMoney[0] == '0' ? '' : splitedMoney[0]).split(''),
            decimalPart = splitedMoney[1] || '';
        var s = '';
        for (var i = 0; i < decimalPart.length; i++) {
            s += (digit[decimalPart[i]] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        for (var i = 0; i < unit[0].length && intPart.length; i++) {
            var p = '';
            for (var j = 0; j < unit[1].length && intPart.length; j++) {
                p = digit[intPart.pop()] + unit[1][j] + p;
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元')
            .replace(/(零.)+/g, '零')
            .replace(/^整$/, '零元整');
    };

export function number2Thousands(number) {
    /*暂时不用千分制*/
    // var splitNum = (Math.abs(number || 0)).toString().split('.'), intNum = splitNum[0], floatNum = splitNum[1], result = '';
    // while (intNum.length > 3) {
    //     result = ',' + intNum.slice(-3) + result;
    //     intNum = intNum.slice(0, intNum.length - 3);
    // }
    // if (intNum) { result = intNum + result; }
    // if(floatNum){ result = result + '.' + floatNum; }
    // if(number < 0){
    //     result = '-' + result;
    // }
    // return result;

    return number;
}