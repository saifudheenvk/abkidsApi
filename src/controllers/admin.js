const Game = require('../schemas/game')
const GameData = require('../schemas/gameData')
const LearningPath = require('../schemas/learningPath')
const gameService = require('../services/game')
const SuccessResponse = require("../models/sucessResponse");
const ErrorResponse = require("../models/errorResponse");
const { INTERNAL_SERVER_ERROR } = require('../constants/statusCode')
const { INTERNAL_SERVER_ERROR_MSG } = require('../constants/responseMessage')


module.exports = {
    addGame: async (req, res) => {
        try {
            const { status, data, code } = await gameService.addGame(req)
            if (status) {
                res.status(code).send(new SuccessResponse(data))
            } else {
                res.status(code).send(new ErrorResponse(data))
            }
        } catch (e) {
            res.status(INTERNAL_SERVER_ERROR).send(new ErrorResponse(INTERNAL_SERVER_ERROR_MSG))
        }
    },

    addGameData: async (req, res) => {
        try {
            const { status, data, code } = await gameService.addGameData(req)
            if (status) {
                res.status(code).send(new SuccessResponse(data))
            } else {
                res.status(code).send(new ErrorResponse(data))
            }
        } catch (e) {
            res.status(INTERNAL_SERVER_ERROR).send(new ErrorResponse(INTERNAL_SERVER_ERROR_MSG))
        }
    },

    addGameLearningPath: async (req, res) => {
        try {
            const childId = req.params.id
            const { status, data, code } = await gameService.addGameLearningPath(req)
            if (status) {
                res.status(code).send(new SuccessResponse(data))
            } else {
                res.status(code).send(new ErrorResponse(data))
            }
        } catch (e) {
            res.status(INTERNAL_SERVER_ERROR).send(new ErrorResponse(INTERNAL_SERVER_ERROR_MSG))
        }
    },
    listLearningPath: async (req, res) => {
        try {
            const grade = req.params.grade
            const { status, data, code } = await gameService.listLearningPath(grade)
            if (status) {
                res.status(code).send(new SuccessResponse(data))
            } else {
                res.status(code).send(new ErrorResponse(data))
            }
        } catch (e) {
            res.status(INTERNAL_SERVER_ERROR).send(new ErrorResponse(INTERNAL_SERVER_ERROR_MSG))
        }
    },
    addMilestone: async (req, res) => {
        try {
            console.log(req.body)
            const { status, data, code } = await gameService.addMilestone(req)
            if (status) {
                res.status(code).send(new SuccessResponse(data))
            } else {
                res.status(code).send(new ErrorResponse(data))
            }
        } catch (e) {
            res.status(INTERNAL_SERVER_ERROR).send(new ErrorResponse(INTERNAL_SERVER_ERROR_MSG))
        }
    },
    listMilestone: async (req, res) => {
        try {
            const milestoneId = req.params.milestoneid
            const { status, data, code } = await gameService.listMilestone(milestoneId)
            if (status) {
                res.status(code).send(new SuccessResponse(data))
            } else {
                res.status(code).send(new ErrorResponse(data))
            }
        } catch (e) {
            res.status(INTERNAL_SERVER_ERROR).send(new ErrorResponse(INTERNAL_SERVER_ERROR_MSG))
        }
    },
    updateMilestone: async (req, res) => {
        try {
            const _id = req.body.milestoneId
            const { status, data, code } = await gameService.updateMilestone(req, _id)
            if (status) {
                res.status(code).send(new SuccessResponse(data))
            } else {
                res.status(code).send(new ErrorResponse(data))
            }
        } catch (e) {
            res.status(INTERNAL_SERVER_ERROR).send(new ErrorResponse(INTERNAL_SERVER_ERROR_MSG))
        }
    },
    updateGameLearningPath: async (req, res) => {
        try {
            const _id = req.params.id
            const { status, data, code } = await gameService.updateGameLearningPath(req, _id)
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