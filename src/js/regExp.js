// 判断类型集合
export const checkStr = (str, type) => {
    switch (type) {
        case 'require': // 必须项
            return !(!str || String(str).length < 1);
        case 'phone': //手机号码
            return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
        case 'tel': //座机
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'card': //身份证
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
        case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
            return /^[a-zA-Z]\w{5,17}$/.test(str)
        case 'alphaLine': // 英文和下划线，首尾不能是下划线、且不能只是下划线
            return (str.slice(0, 1) != '_' && str.slice(-1) != '_' && /^[A-Za-z\_]+$/.test(str));
        case 'alphaNum': // 字母和数字
            return /^[a-zA-Z]+|[0-9]+$/.test(str);
        case 'postal': //邮政编码
            return /[1-9]\d{5}(?!\d)/.test(str);
        case 'QQ': //QQ号
            return /^[1-9][0-9]{4,9}$/.test(str);
        case 'email': //邮箱
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'money': //金额(小数点2位)
            return /^\d*(?:\.\d{0,2})?$/.test(str);
        case 'URL': //网址
            return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
        case 'IP': //IP
            return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
        case 'date': //日期时间
            return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
        case 'number': // 数值
            return /^-?[1-9][0-9]?.?[0-9]*$/.test(str);
        case 'integer': // 整数
            return /(^[1-9]\d*$)/.test(str);
        case 'float': // 浮点数
            return /^(-?\\d+)(\\.\\d+)?$/.test(str);
        case 'english': //英文
            return /^[a-zA-Z]+$/.test(str);
        case 'chinese': //中文
            return /^[\\u4E00-\\u9FA5]+$/.test(str);
        case 'chnNum': // 同时包含数字和汉字
            return /^[0-9\u4e00-\u9fa5]+$/u.test(str);
        case 'chnOrNum': // 包含汉字或者数字
            return /^[\u4e00}-\u9fa5]+|[0-9]+$/u.test(str);
        case 'lower': //小写
            return /^[a-z]+$/.test(str);
        case 'upper': //大写
            return /^[A-Z]+$/.test(str);
        case 'HTML': //HTML标记
            return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
        case 'isString': // 验证是否字符串
            return Object.prototype.toString.call(str).slice(8, -1) === 'String';
        case 'isNumber': // 验证是否是否数字
            return Object.prototype.toString.call(str).slice(8, -1) === 'Number';
        case 'isBoolean': //  验证是否是Boolean
            return Object.prototype.toString.call(str).slice(8, -1) === 'Boolean';
        case 'isFunction': // 验证是否是函数
            return Object.prototype.toString.call(str).slice(8, -1) === 'Function';
        case 'isNull': // 是否为null
            return Object.prototype.toString.call(str).slice(8, -1) === 'Null';
        case 'isUndefined': // 是否undefined
            return Object.prototype.toString.call(str).slice(8, -1) === 'Undefined';
        case 'isObj': // 是否对象
            return Object.prototype.toString.call(str).slice(8, -1) === 'Object';
        case 'isArray': // 是否数组
            return Object.prototype.toString.call(str).slice(8, -1) === 'Array';
        case 'isDate': // 是否时间对象
            return Object.prototype.toString.call(str).slice(8, -1) === 'Date';
        case 'isRegExp': // 是否正则
            return Object.prototype.toString.call(str).slice(8, -1) === 'RegExp';
        case 'isError': // 是否错误对象
            return Object.prototype.toString.call(str).slice(8, -1) === 'Error';
        case 'isSymbol': // 是否Symbol函数
            return Object.prototype.toString.call(str).slice(8, -1) === 'Symbol';
        case 'isPromise': // 是否Promise对象
            return Object.prototype.toString.call(str).slice(8, -1) === 'Promise';
        case 'isSet': // 是否Set对象
            return Object.prototype.toString.call(str).slice(8, -1) === 'Set';
        case 'isObject': //判断数据是不是引用类型的数据
            let type = typeof str;
            return str != null && (type == 'object' || type == 'function');
        default:
            return true;
    }
}
// 检测密码强度 等级1-5
export const checkPwd = (str) => {
    var Lv = 1;
    if (str.length < 6) {
        return Lv
    }
    if (/[0-9]/.test(str)) {
        Lv++
    }
    if (/[a-z]/.test(str)) {
        Lv++
    }
    if (/[A-Z]/.test(str)) {
        Lv++
    }
    if (/[\.|-|_]/.test(str)) {
        Lv++
    }
    return Lv;
}
/*
 * cardRequired.js
 * 身份证号校验&&必填
 * val	value
 * 身份证号合法性验证    支持15位和18位身份证号    //支持地址编码、出生日期、校验位验证
 * Y J
 * 
 */
var cardRequired =function(val) {
    var b = "",
        c = "",
        d = {};
    /*身份证号长度校验*/
    if(!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(val)) {
        return {
            is: false,
 
            tip: "你输入的身份证长度或格式错误!"
 
        }
 
    };
    /*身份证号地址编码校验*/
    if(!/^11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65|71|81|82|91$/.test(val.substr(0, 2))) {
            return {
                is: false,
                tip: "你输入的身份证号地址编码错误!"
            }
       };
       /*15位身份证号转18位身份证号*/
    var a18 = val;
    if(val.length == '15') {
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var cardTemp = 0,
        i;
        a18 = ""
        a18 = val.substr(0, 6) + '19' + val.substr(6, val.length - 6);
        for(i = 0; i < 17; i++) {
            cardTemp += a18.substr(i, 1) * arrInt[i];
        }
        a18 += arrCh[cardTemp % 11];
    }
    /*获取身份证号中的年月日并校验*/
    var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/;
    var arr_data = a18.match(re_eighteen);
    var year = arr_data[2];
    var month = arr_data[3];
    var day = arr_data[4];
    var birthday = new Date(year + '/' + month + '/' + day);
    var now = new Date();
    var time = now.getFullYear() - year;
    /*校验年月日是否合理 */
    if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
        if(time >= 0 || time <= 130) {
            return {
                is: "true",
                tip: ""
            }
        }
    };
    return {
        is: false,
        tip: "你输入的身份证号出生年月日不合理!"
    }
}