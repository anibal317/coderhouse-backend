function itemsInArray(arr1, arr2) {
    return arr1.every(item => arr2.includes(item))
}


module.exports = {
    itemsInArray
}