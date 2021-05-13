/**
 * 随机汉字 字符
 * @param {Number} start 开始字符数字 0x4e00
 * @param {Number} end 结束字符数字 0x9fa5
 */
const randomChinese = function(start, end) {
    start = start || 0x4E00;
    end = end || 0x9FA5;
    var ran = randomNum(start, end);
    return String.fromCharCode(ran)
}

