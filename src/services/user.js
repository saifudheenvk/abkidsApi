const User = require('../schemas/user')
const HttpCodes = require('../constants/statusCode')
const ResponseMessages = require('../constants/responseMessage')

exports.createUser = async (dataObj) => {
    try {
        const user = new User(dataObj.body)
        await user.save()
        const token = await user.generateAuthtoken()
        return {
            data: {
                user,
                token
            },
            code: HttpCodes.CREATED,
            status: true
        }
    } catch (e) {
        let err
        if (e.name === 'MongoError' && e.code === 11000) {
            err = ResponseMessages.EMAIL_ALREADY_EXIST
            code = HttpCodes.BAD_REQUEST
        } else if (e.name == 'ValidationError') {
            err = ResponseMessages.INVALID_DATA
            code = HttpCodes.BAD_REQUEST
        } else {
            err = ResponseMessages.UNABLE_TO_CREATE_USER
            code = HttpCodes.BAD_REQUEST
        }
        return {
            data: err,
            code,
            status: false
        }
    }
}

exports.userLogin = async (dataObj) => {
    try {
        const user = await User.findByCredentials(dataObj.body.email, dataObj.body.password, dataObj.body.role)
        const token = await user.generateAuthtoken()
        return {
            data: {
                user,
                token
            },
            code: HttpCodes.OK,
            status: true
        }
    } catch (e) {
        let err
        if (e.message == 'NO_USER') {
            err = ResponseMessages.USER_NOT_FOUND
            code = HttpCodes.NOT_FOUND
        } else if (e.message == 'WRONG_PWD') {
            err = ResponseMessages.PASSWORD_DONT_MATCH
            code = HttpCodes.BAD_REQUEST
        } else {
            err = ResponseMessages.UNABLE_LOGIN
            code = HttpCodes.BAD_REQUEST
        }
        return {
            data: err,
            code,
            status: false
        }
    }
}

exports.userLogout = async (dataObj) => {
    try {

        dataObj.user.tokens = dataObj.user.tokens.filter((token) => {
            return token.token != dataObj.token
        })
        await dataObj.user.save()
        return {
            data: ResponseMessages.LOGOUT_SUCCESS,
            code: HttpCodes.OK,
            status: true
        }
    } catch (e) {
        let err
        err = ResponseMessages.UNABLE_LOGOUT
        code = HttpCodes.BAD_REQUEST
        return {
            data: err,
            code,
            status: false
        }
    }
}