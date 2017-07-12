'use strict';
/**
 * config
 */
module.exports = {
    mongodb: 'mongodb://localhost:9000/vueblog',
    port: 8080,
    token: {
        secret: 'weimengjiao',
        expired: '1d'
    },
    errCode: {
        1000: 'USER_NOT_EXISTED',
        1001: 'WRONG_PASSWORD',
        1002: 'PERMISSION_DENIED'
    }
};