/**
 * 普通 深拷贝
 * @param {Any} anyVal 任何值
 * @param {Object|Array} target [{}] 容器
 * @return {Any}
 */
function deepCopy (anyVal, target = {}) {
    if (typeof anyVal !== 'object' || anyVal === null) return anyVal;

    for (let i in anyVal) {
        const val = anyVal[i];

        if (isType('array', val)) {
            target[i] = deepCopy(val, [])
        } else if (typeof val === 'object') {
            target[i] = deepCopy(val);
        } else {
            target[i] = val;
        }
    }

    return target;
}
// 字符串超出多少字显示省略号
export function strOut(str, len=0,type) {
	type=type||'star';
	var restr = '';
	if (str) {
		if (str.length >= len) {
			restr = str.substring(0, len) + (type=='star'?'***':'...');
		} else {
			restr = str;
		}
	}
	return restr;
}
//浮点数加法运算--解决精度丢失（传入Number，返回Number）
export function FloatAdd(arg1, arg2) {
	var r1, r2, m;
	try {
		r1 = arg1.toString().split('.')[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split('.')[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	return (arg1 * m + arg2 * m) / m;
}

//浮点数乘法运算--解决精度丢失（传入Number，返回Number）
export function FloatMul(arg1, arg2) {
	var m = 0,
		s1 = arg1.toString(),
		s2 = arg2.toString();
	try {
		m += s1.split('.')[1].length;
	} catch (e) {}
	try {
		m += s2.split('.')[1].length;
	} catch (e) {}
	return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
}

// 将阿拉伯数字翻译成中文的大写数字
export const numberToChinese = (num) => {
	var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
	var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
	var a = ("" + num).replace(/(^0*)/g, "").split("."),
		k = 0,
		re = "";
	for (var i = a[0].length - 1; i >= 0; i--) {
		switch (k) {
			case 0:
				re = BB[7] + re;
				break;
			case 4:
				if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$")
					.test(a[0]))
					re = BB[4] + re;
				break;
			case 8:
				re = BB[5] + re;
				BB[7] = BB[5];
				k = 0;
				break;
		}
		if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
			re = AA[0] + re;
		if (a[0].charAt(i) != 0)
			re = AA[a[0].charAt(i)] + BB[k % 4] + re;
		k++;
	}

	if (a.length > 1) // 加上小数部分(如果有小数部分)
	{
		re += BB[6];
		for (var i = 0; i < a[1].length; i++)
			re += AA[a[1].charAt(i)];
	}
	if (re == '一十')
		re = "十";
	if (re.match(/^一/) && re.length == 3)
		re = re.replace("一", "");
	return re;
}
// 将数字转换为大写金额
export const changeToChinese = (Num) => {
	//判断如果传递进来的不是字符的话转换为字符
	if (typeof Num == "number") {
		Num = new String(Num);
	};
	Num = Num.replace(/,/g, "") //替换tomoney()中的“,”
	Num = Num.replace(/ /g, "") //替换tomoney()中的空格
	Num = Num.replace(/￥/g, "") //替换掉可能出现的￥字符
	if (isNaN(Num)) { //验证输入的字符是否为数字
		//alert("请检查小写金额是否正确");
		return "";
	};
	//字符处理完毕后开始转换，采用前后两部分分别转换
	var part = String(Num).split(".");
	var newchar = "";
	//小数点前进行转化
	for (var i = part[0].length - 1; i >= 0; i--) {
		if (part[0].length > 10) {
			return "";
			//若数量超过拾亿单位，提示
		}
		var tmpnewchar = ""
		var perchar = part[0].charAt(i);
		switch (perchar) {
			case "0":
				tmpnewchar = "零" + tmpnewchar;
				break;
			case "1":
				tmpnewchar = "壹" + tmpnewchar;
				break;
			case "2":
				tmpnewchar = "贰" + tmpnewchar;
				break;
			case "3":
				tmpnewchar = "叁" + tmpnewchar;
				break;
			case "4":
				tmpnewchar = "肆" + tmpnewchar;
				break;
			case "5":
				tmpnewchar = "伍" + tmpnewchar;
				break;
			case "6":
				tmpnewchar = "陆" + tmpnewchar;
				break;
			case "7":
				tmpnewchar = "柒" + tmpnewchar;
				break;
			case "8":
				tmpnewchar = "捌" + tmpnewchar;
				break;
			case "9":
				tmpnewchar = "玖" + tmpnewchar;
				break;
		}
		switch (part[0].length - i - 1) {
			case 0:
				tmpnewchar = tmpnewchar + "元";
				break;
			case 1:
				if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
				break;
			case 2:
				if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
				break;
			case 3:
				if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
				break;
			case 4:
				tmpnewchar = tmpnewchar + "万";
				break;
			case 5:
				if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
				break;
			case 6:
				if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
				break;
			case 7:
				if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
				break;
			case 8:
				tmpnewchar = tmpnewchar + "亿";
				break;
			case 9:
				tmpnewchar = tmpnewchar + "拾";
				break;
		}
		var newchar = tmpnewchar + newchar;
	}
	//小数点之后进行转化
	if (Num.indexOf(".") != -1) {
		if (part[1].length > 2) {
			// alert("小数点之后只能保留两位,系统将自动截断");
			part[1] = part[1].substr(0, 2)
		}
		for (i = 0; i < part[1].length; i++) {
			tmpnewchar = ""
			perchar = part[1].charAt(i)
			switch (perchar) {
				case "0":
					tmpnewchar = "零" + tmpnewchar;
					break;
				case "1":
					tmpnewchar = "壹" + tmpnewchar;
					break;
				case "2":
					tmpnewchar = "贰" + tmpnewchar;
					break;
				case "3":
					tmpnewchar = "叁" + tmpnewchar;
					break;
				case "4":
					tmpnewchar = "肆" + tmpnewchar;
					break;
				case "5":
					tmpnewchar = "伍" + tmpnewchar;
					break;
				case "6":
					tmpnewchar = "陆" + tmpnewchar;
					break;
				case "7":
					tmpnewchar = "柒" + tmpnewchar;
					break;
				case "8":
					tmpnewchar = "捌" + tmpnewchar;
					break;
				case "9":
					tmpnewchar = "玖" + tmpnewchar;
					break;
			}
			if (i == 0) tmpnewchar = tmpnewchar + "角";
			if (i == 1) tmpnewchar = tmpnewchar + "分";
			newchar = newchar + tmpnewchar;
		}
	}
	//替换所有无用汉字
	while (newchar.search("零零") != -1)
		newchar = newchar.replace("零零", "零");
	newchar = newchar.replace("零亿", "亿");
	newchar = newchar.replace("亿万", "亿");
	newchar = newchar.replace("零万", "万");
	newchar = newchar.replace("零元", "元");
	newchar = newchar.replace("零角", "");
	newchar = newchar.replace("零分", "");
	if (newchar.charAt(newchar.length - 1) == "元") {
		newchar = newchar + "整"
	}
	return newchar;
}

// 数组删除其中一个元素
export const arrRemove = (arr, ele) => {
	var index = arr.indexOf(ele);
	if (index > -1) {
		arr.splice(index, 1);
	}
	return arr;
}

// 求数组中的最大值
export const arrMax = (arr) => {
	return Math.max.apply(null, arr);
}
// 求数组中的最小值
export const arrMin = (arr) => {
	return Math.min.apply(null, arr);
}
// 数组中的值求和
export const arrSum = (arr) => {
	return arr.reduce((pre, cur) => {
		return pre + cur
	})
}
// 去除空格,type: 1-所有空格 2-前后空格 3-前空格 4-后空格
export const strTrim = (str, type) => {
	type = type || 2
	switch (type) {
		case 1:
			return str.replace(/\s+/g, "");
		case 2:
			return str.replace(/(^\s*)|(\s*$)/g, "");
		case 3:
			return str.replace(/(^\s*)/g, "");
		case 4:
			return str.replace(/(\s*$)/g, "");
		default:
			return str;
	}
}
// 字符转换，type: 1:首字母大写 2：首字母小写 3：大小写转换 4：全部大写 5：全部小写
export const changeCase = (str, type) => {
	type = type || 4
	switch (type) {
		case 1:
			return str.replace(/\b\w+\b/g, (word) => {
				return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();

			});
		case 2:
			return str.replace(/\b\w+\b/g, (word) => {
				return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
			});
		case 3:
			return str.split('').map((word) => {
				if (/[a-z]/.test(word)) {
					return word.toUpperCase();
				} else {
					return word.toLowerCase()
				}
			}).join('')
		case 4:
			return str.toUpperCase();
		case 5:
			return str.toLowerCase();
		default:
			return str;
	}
}
