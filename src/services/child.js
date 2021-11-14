const Child = require('../schemas/child')
const HttpCodes = require('../constants/statusCode')
const ResponseMessages = require('../constants/responseMessage')

exports.levelUpgrade = async (childId) => {
    try {
        const child = await Child.findOneAndUpdate({ _id: childId }, { $inc: { level: 1 } }, { new: true })
        if (child) {
            return {
                status: true,
                data: child,
                code: HttpCodes.CREATED
            }
        } else {
            throw new Error('error')
        }

    } catch (e) {
        let err = ResponseMessages.UNABLE_TO_UPGRADE_CHILD
        return {
            status: false,
            data: err,
            code: HttpCodes.INTERNAL_SERVER_ERROR
        }
    }
}

exports.getChildrenById = async (childId, parentId) => {
    try {
        const children = await Child.find({ _id: childId, parent: parentId })
        if (children.length > 0) {

            return {
                status: true,
                data: children,
                code: HttpCodes.OK
            }

        } else {
            throw new Error('NO_DATA_FOUND')
        }

    } catch (e) {
        let err
        if (e.name == 'ValidationError') {
            err = ResponseMessages.INVALID_DATA
            code = HttpCodes.BAD_REQUEST
        } else if (e.message === 'NO_DATA_FOUND') {
            err = ResponseMessages.NO_DATA_FOUND
            code = HttpCodes.BAD_REQUEST
        } else {
            err = ResponseMessages.UNABLE_TO_FIND_CHILD
            code = HttpCodes.BAD_REQUEST
        }
        return {
            status: false,
            data: err,
            code
        }
    }
}