'use strict';

const config = require('../config/config.js');

module.exports = (type) => {
    return {
        code: type,
        message: config.errCode[type]
    };
};