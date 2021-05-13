//获取两个日期之间相差天数
const getDayDiff = function(endDate, startDate) {
	startDate = startDate || getNowD();
	startDate = typeof startDate == "string" ? new Date(startDate) : startDate;
	endDate = typeof endDate == "string" ? new Date(endDate) : endDate;
	var s1 = startDate.getTime(),
		s2 = endDate.getTime();
	var total = (s2 - s1) / (1000 * 24 * 60 * 60);
	var day = parseInt(total); //计算整数天数
	return day;
}

/**
 * 得到当前日期  年月日
 */
const getNowD = function(addDay, date) {
	date = date || new Date();
	date = typeof date == 'string' ? new Date(date) : date;
	addDay = addDay || 0;
	date.setDate(date.getDate() + addDay);
	return date.getFullYear() + "-" + padLeft((date.getMonth() + 1), 2) + "-" + padLeft(date.getDate(), 2);
}

/**
 * 得到当前日期  年月日 时分秒
 */
const getNowDT = function(addDay, date) {
	date = date || new Date();
	addDay = addDay || 0;
	date.setDate(date.getDate() + addDay);
	return date.getFullYear() + "-" + padLeft((date.getMonth() + 1), 2) + "-" + padLeft(date.getDate(), 2) +
		" " + padLeft(date.getHours(), 2) + ":" + padLeft(date.getMinutes(), 2) + ":" + padLeft(date.getSeconds(), 2);
}
/**
 * 获取一个日期对应的星期
 * @param {Object} addDay 添加的天数,可为负数
 * @param {Object} date
 */
const getNowW = function(addDay, date) {
	var date = getNowD(addDay, date);
	var d = new Date(date);
	var str = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
	return str[d.getDay()];
}

/**
 * 得到当前时间 或者在当前时间的基础上 加上一定的时间
 * @param addMinutes  1分钟 = 1*60*1000
 * @param date
 * @return {string}
 */
const getNowT = function(addMillisecond, date) {
	date = date || new Date();
	addMinutes = addMinutes || 0;
	date.setTime(date.getTime() + addMinutes);
	return padLeft(date.getHours(), 2) + ":" + padLeft(date.getMinutes(), 2) + ":" + padLeft(date.getSeconds(), 2);
}

/**
 * 将数字串转换成日期格式的字符串
 * @param number
 * @return {*}
 */
const getDateByNumber = function(number) {
	if (!isNaN(number)) {
		number = parseInt(number);
		return getNowDT(0, new Date(number));
	}
	return number;
}

//将日期格式化为今天昨天，今年明年等格式
/**
 * @param {Object} time 时间
 * 							
 */
const getFormatTime = function(dateTime) {
	var now = getNowD();
	if (dateTime.indexOf(now) >= 0) {
		return dateTime.substr(0, 16).replace(now, '今天')
	}
	var yesterday = getNowD(-1);
	if (dateTime.indexOf(yesterday) >= 0) {
		return dateTime.substr(0, 16).replace(yesterday, '昨天')
	}

	var tomorrow = getNowD(1);
	if (dateTime.indexOf(tomorrow) >= 0) {
		return dateTime.substr(0, 16).replace(tomorrow, '明天')
	}

	var year = getNowD().substr(0, 4);
	if (dateTime.indexOf(year) >= 0) {
		dateTime = dateTime.substr(0, 10).replace(year + "-", '今年 ')
	}


	var lastYear = parseInt(year) - 1;
	if (dateTime.indexOf(lastYear) >= 0) {
		dateTime = dateTime.substr(0, 10).replace(lastYear + "-", '去年 ')
	}

	if (dateTime.indexOf('去年') >= 0 || dateTime.indexOf('今年') >= 0 || time.indexOf('昨天') >= 0 || time.indexOf('今天') >= 0) {
		return dateTime;
	}
	return dateTime.substr(0, 16);
}

/**
 * 根据日期生成对应的时段
 */
const _hourSplitArray = [{
		hour: 6,
		text: '凌晨'
	},
	{
		hour: 9,
		text: '早上'
	},
	{
		hour: 12,
		text: '上午'
	},
	{
		hour: 14,
		text: '中午'
	},
	{
		hour: 17,
		text: '下午'
	},
	{
		hour: 19,
		text: '傍晚'
	},
	{
		hour: 22,
		text: '晚上'
	},
	{
		hour: 24,
		text: '夜里'
	}
]
const getTimeSplit = function(dateTime) {
	dateTime = dateTime || new Date();
	dateTime = typeof dateTime == 'string' ? new Date(dateTime) : dateTime;
	var hour = dateTime.getHours()
	for (let i = 0; i < _hourSplitArray.length; i++) {
		var _h = _hourSplitArray[i]['hour'];
		if (hour < _h) {
			return _hourSplitArray[i]['text']
		}
	}
	return txet = ''
}
// 格式化时间-小于10补0
function formatDigit(n) {
	return n.toString().replace(/^(\d)$/, '0$1');
}

// 格式化时间，通用
 const formatDate = (timestamp, formats) => {
	/* formats格式包括:
	    1. Y-M-D
	    2. Y-M-D h:m:s
	    3. Y年M月D日
	    4. Y年M月D日 h时m分
	    5. Y年M月D日 h时m分s秒
	    示例：console.log(formatDate(1500305226034, 'Y年M月D日 h:m:s')) ==> 2017年07月17日 23:27:06
	*/
	formats = formats || 'Y-M-D';
	var myDate = undefined;
	if (timestamp) {
		if (typeof(timestamp) != 'string') {
			myDate = timestamp;
		} else {
			myDate = new Date(timestamp);
		}
	} else {
		myDate = new Date();
	}

	var year = myDate.getFullYear();
	var month = formatDigit(myDate.getMonth() + 1);
	var day = formatDigit(myDate.getDate());
	var hour = formatDigit(myDate.getHours());
	var minute = formatDigit(myDate.getMinutes());
	var second = formatDigit(myDate.getSeconds());
	return formats.replace(/Y|M|D|h|m|s/g, (matches) => {
		return {
			Y: year,
			M: month,
			D: day,
			h: hour,
			m: minute,
			s: second
		} [matches];
	});
}

//对数字进行前置补位
const padLeft = function(str, length,replaceChar) {
	return ("0000000000000000".replace(/[0]/g,replaceChar||0) + str).substr(-length);
}

