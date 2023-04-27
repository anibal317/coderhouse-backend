const md5 = require('blueimp-md5');

async function hashPassword(password) {
    return md5(password);
}



module.exports = {
    hashPassword
}