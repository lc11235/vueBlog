const crypto = require('crypto');

/**
 * 使用MD5加盐加密
 * 盐（salt）是密码的Fibonacci sequence
 */
const fibonacciString = (pwd) => {
    let fiArray = [];
    let [fiStartFirst, fiStartSecond] = [1, 1];
    let fiEnd;
    fiArray.push(pwd[fiStartFirst], pwd[fiStartSecond]);
    while(true){
        fiEnd = fiStartFirst + fiStartSecond;
        if(fiEnd > pwd.length) break;
        fiArray.push(pwd[fiEnd]);
        fiStartFirst = fiStartSecond;
        fiStartSecond = fiEnd;
    }
    return fiArray.join('');
};

const cryptoMd5 = (pwd) => {
    let md5 = crypto.createHash('md5');
    let passwordSalt = fibonacciString(pwd);
    pwd = md5.update(pwd + ':' + passwordSalt).digest('hex');
    return pwd;
};

module.exports = cryptoMd5;
