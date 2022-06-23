const mongoose = require('mongoose');

const validId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

const isValid = function (value,dataType) {
    if (typeof value !=dataType) return false
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}


const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

module.exports.validId = validId
module.exports.isValid = isValid
module.exports.isValidRequestBody = isValidRequestBody