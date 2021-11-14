const User = require('../schemas/user')
const userService = require('../services/user')
const SuccessResponse = require("../models/sucessResponse");
const ErrorResponse = require("../models/errorResponse");

module.exports = {
    createUser: async (req, res) => {
        try {
            const { status, data, code } = await userService.createUser(req);
            if (status) {
                res.status(code).send(new SuccessResponse(data))
            } else {
                res.status(code).send(new ErrorResponse(data))
            }
        } catch (e) {
            res.status(500).send(e)
        }
    },

    userLogin: async (req, res) => {
        try {
            const { status, data, code } = await userService.userLogin(req)
            if (status) {
                res.status(code).send(new SuccessResponse(data))
            } else {
                res.status(code).send(new ErrorResponse(data))
            }
        } catch (e) {
            res.status(400).send()
        }
    },

    getUser: (req, res) => {
        try {
            const data = req.user
            res.send(new SuccessResponse(data))
        } catch (e) {
            res.status(400).send()
        }
    },

    logoutUser: async (req, res) => {
        try {
            const { status, data, code } = await userService.userLogout(req)
            if (status) {
                res.status(code).send(new SuccessResponse(data))
            } else {
                res.status(code).send(new ErrorResponse(data))
            }
        } catch (e) {
            res.status(400).send()
        }
    }
}
