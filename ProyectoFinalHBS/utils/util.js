function itemsInArray(arr1, arr2) {
    return arr1.every(item => arr2.includes(item))
}
function automaticID() {
    let id = Date.now().toString()
    return id
}
function getDate(format) {
    let actualDate = new Date()
    if (format === "yyyy-mm-dd") {
        return actualDate.getFullYear() + "-" + (actualDate.getMonth()+1) + "-" + actualDate.getDate()
    }
    if (format === "dd-mm-yyyy") {
        return actualDate.getDate()+ "-" + (actualDate.getMonth()+1) + "-" + actualDate.getFullYear()
    }
    if(format==="mm-dd-yyyy"){
        return (actualDate.getMonth()+1)+"-"+actualDate.getDate()+"-"+actualDate.getFullYear()
    }
}

module.exports = {
    itemsInArray,
    automaticID,
    getDate
}