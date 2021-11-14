const childService = require('../services/child')
const {INTERNAL_SERVER_ERROR} = require('../constants/statusCode')
const {INTERNAL_SERVER_ERROR_MSG} = require('../constants/responseMessage')
const SuccessResponse = require("../models/sucessResponse");
const ErrorResponse = require("../models/errorResponse");
module.exports = {
    levelUpgrade: async (req, res) => {
        try {
            const childId = req.params.id
            const { status, data, code } = await childService.levelUpgrade(childId)
            if(status){
                res.status(code).send(new SuccessResponse(data))
            } else {
                res.status(code).send(new ErrorResponse(data))
            }
        } catch (e) {
            res.status(INTERNAL_SERVER_ERROR).send(new ErrorResponse(INTERNAL_SERVER_ERROR_MSG))
        }
    },
    getChildrenById: async (req, res) => {
        try {
            const parentId = req.user._id
            const childId = req.params.id
            const { status, data, code } = await childService.getChildrenById(childId, parentId)
            if (status) {
                res.status(code).send(new SuccessResponse(data))
            } else {
                res.status(code).send(new ErrorResponse(data))
            }
        } catch (e) {
            res.status(INTERNAL_SERVER_ERROR).send(new ErrorResponse(INTERNAL_SERVER_ERROR_MSG))
        }
    }
    
}