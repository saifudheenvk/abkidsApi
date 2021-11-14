const gameService = require('../services/game')
const SuccessResponse = require("../models/sucessResponse");
const ErrorResponse = require("../models/errorResponse");
const { INTERNAL_SERVER_ERROR } = require('../constants/statusCode')
const { INTERNAL_SERVER_ERROR_MSG } = require('../constants/responseMessage')

module.exports = {
    listGame: async (req, res) => {
        try {
            const { status, data, code } = await gameService.listGame()
            if (status) {
                res.status(code).send(new SuccessResponse(data))
            } else {
                res.status(code).send(new ErrorResponse(data))
            }
        } catch (e) {
            res.status(INTERNAL_SERVER_ERROR).send(new ErrorResponse(INTERNAL_SERVER_ERROR_MSG))
        }
    },

    listGameDataByGameId: async (req, res) => {
        try {
            const gameId = req.params.id
            const { status, data, code } = await gameService.listGameDataByGameId(gameId)
            if (status) {
                res.status(code).send(new SuccessResponse(data))
            } else {
                res.status(code).send(new ErrorResponse(data))
            }
        } catch (e) {
            res.status(INTERNAL_SERVER_ERROR).send(new ErrorResponse(INTERNAL_SERVER_ERROR_MSG))
        }
    },

    getGameDataById: async (req, res) => {
        try {
            const gameId = req.params.id
            const { status, data, code } = await gameService.getGameDataById(gameId)
            if (status) {
                res.status(code).send(new SuccessResponse(data))
            } else {
                res.status(code).send(new ErrorResponse(data))
            }
        } catch (e) {
            res.status(INTERNAL_SERVER_ERROR).send(new ErrorResponse(INTERNAL_SERVER_ERROR_MSG))
        }
    },

    listGameDataByGameDataId: async (req, res) => {
        try {
            const gameDataId = req.params.id
            const { status, data, code } = await gameService.listGameDataByGameDataId(gameDataId)
            if (status) {
                res.status(code).send(new SuccessResponse(data))
            } else {
                res.status(code).send(new ErrorResponse(data))
            }
        } catch (e) {
            res.status(INTERNAL_SERVER_ERROR).send(new ErrorResponse(INTERNAL_SERVER_ERROR_MSG))
        }
    },

    gameLevelDatabyId: async (req, res) => {
        try {
            const gameId = req.params.id
            const level = req.params.level
            const { status, data, code } = await gameService.gameLevelDatabyId(gameId, level)
            if (status) {
                console.log(data)
                res.status(code).send(new SuccessResponse(data))
            } else {
                res.status(code).send(new ErrorResponse(data))
            }
        } catch (e) {
            res.status(INTERNAL_SERVER_ERROR).send(new ErrorResponse(INTERNAL_SERVER_ERROR_MSG))
        }
    },

    gameMilestoneDetails: async (req, res) => {
        try {
            const grade = req.params.grade
            const { status, data, code } = await gameService.gameMilestoneDetails(grade)
            if (status) {
                console.log(data)
                res.status(code).send(new SuccessResponse(data))
            } else {
                res.status(code).send(new ErrorResponse(data))
            }
        } catch (e) {
            res.status(INTERNAL_SERVER_ERROR).send(new ErrorResponse(INTERNAL_SERVER_ERROR_MSG))
        }
    },

    
    gameLeveDetails: async (req, res) => {
        try {
            const grade = req.params.grade
            const { status, data, code } = await gameService.gameLeveDetails(grade)
            if (status) {
                console.log(data)
                res.status(code).send(new SuccessResponse(data))
            } else {
                res.status(code).send(new ErrorResponse(data))
            }
        } catch (e) {
            res.status(INTERNAL_SERVER_ERROR).send(new ErrorResponse(INTERNAL_SERVER_ERROR_MSG))
        }
    },

    gameMilestoneDetailsAdmin: async (req, res) => {
        try {
            const milestoneid = req.params.milestoneid
            const { status, data, code } = await gameService.gameMilestoneDetailsAdmin(milestoneid)
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