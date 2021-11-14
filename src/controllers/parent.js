const parentService = require('../services/parent')
const { INTERNAL_SERVER_ERROR } = require('../constants/statusCode')
const { INTERNAL_SERVER_ERROR_MSG } = require('../constants/responseMessage')
const SuccessResponse = require("../models/sucessResponse");
const ErrorResponse = require("../models/errorResponse");

module.exports = {
    addChild: async (req, res) => {
        try {
            const { status, data, code } = await parentService.addChild(req)
            if (status) {
                res.status(code).send(new SuccessResponse(data))
            } else {
                res.status(code).send(new ErrorResponse(data))
            }
        } catch (e) {
            res.status(INTERNAL_SERVER_ERROR).send(new ErrorResponse(INTERNAL_SERVER_ERROR_MSG))
        }
    },

    updateChild: async (req, res) => {
        try {
            const { status, data, code } = await parentService.updateChild(req)
            if (status) {
                res.status(code).send(new SuccessResponse(data))
            } else {
                res.status(code).send(new ErrorResponse(data))
            }
        } catch (e) {
            res.status(INTERNAL_SERVER_ERROR).send(new ErrorResponse(INTERNAL_SERVER_ERROR_MSG))
        }
    },
    getMilestoneDetails: async (req, res) => {
        try {
            const milestoneId = req.params.milestoneid
            const { status, data, code } = await parentService.getMilestoneDetails(milestoneId)
            if (status) {
                res.status(code).send(new SuccessResponse(data))
            } else {
                res.status(code).send(new ErrorResponse(data))
            }
        } catch (e) {
            res.status(INTERNAL_SERVER_ERROR).send(new ErrorResponse(INTERNAL_SERVER_ERROR_MSG))
        }
    },
    getChildren: async (req, res) => {
        try {
            const parentId = req.user._id
            const { status, data, code } = await parentService.getChildren(parentId)
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