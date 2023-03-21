function timeStamp(){
    return Date.now()
}

function generateRandomCode(min, max) {
    return timeStamp()+"||"+Math.floor((Math.random() * (max - min + 1)) + min);
}

function generateBigCodeNumber() {
    let max=999999999999
    let min=100000000000
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

module.exports= {
    timeStamp,
    generateRandomCode,
    generateBigCodeNumber
}