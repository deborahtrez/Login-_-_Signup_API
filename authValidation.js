const joi = require('@hapi/joi')

//validate sign up fields
const signupcheck = (data) => {
    const validateSchema = joi.object({
        username: joi.string().min(4).required(),
        email: joi.string().min(4).required().email(),
        password:joi.string().min(4).required(),
        gender: joi.string().min(4).required(),
        country:joi.string().min(4).required(),
        profession: joi.string().min(4).required()
    })
    return validateSchema.validate(data)
}

//validate login fields
const logincheck = (data) => {
    const validateSchema = joi.object({
        email: joi.string().min(4).required(),
        password: joi.string().min(4).required()
    })
    return validateSchema.validate(data)
}

module.exports.signupcheck = signupcheck
module.exports.logincheck = logincheck