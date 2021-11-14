const Game = require('../schemas/game')
const GameData = require('../schemas/gameData')
const LearningPath = require('../schemas/learningPath')
const HttpCodes = require('../constants/statusCode')
const ResponseMessages = require('../constants/responseMessage')
const Milestone = require('../schemas/milestone')


exports.addGame = async (dataObj) => {
    try {
        if (!dataObj.file) {
            throw new Error('IMAGE_REQUIRED')
        }
        const basePath = `${dataObj.protocol}://${dataObj.get('host')}/images/`
        const fileName = dataObj.file.filename
        const imageUrl = `${basePath}${fileName}`

        const game = new Game({
            name: dataObj.body.name,
            image: imageUrl,
            requiredFields: JSON.parse(dataObj.body.requiredFields),
        })
        await game.save()
        return {
            status: true,
            data: game,
            code: HttpCodes.CREATED
        }
    } catch (e) {
        console.log(e)
        let err
        if (e.name == 'ValidationError') {
            err = ResponseMessages.INVALID_DATA
            code = HttpCodes.BAD_REQUEST
        } else {
            err = ResponseMessages.UNABLE_Add_GAME
            code = HttpCodes.BAD_REQUEST
        }
        return {
            status: false,
            data: err,
            code
        }
    }
}

exports.listGame = async () => {
    try {
        const gameList = await Game.find()
        return {
            status: true,
            data: gameList,
            code: HttpCodes.OK
        }
    } catch (e) {
        let err
        if (e.name == 'ValidationError') {
            err = ResponseMessages.INVALID_DATA
            code = HttpCodes.BAD_REQUEST
        } else {
            err = ResponseMessages.UNABLE_FETCH_GAME
            code = HttpCodes.NOT_FOUND
        }
        return {
            status: false,
            data: err,
            code
        }
    }
}

exports.addGameData = async (dataObj) => {
    try {
        const gameData = new GameData({
            level: dataObj.body.level,
            gameId: dataObj.body.gameId,
            gameValues: JSON.parse(dataObj.body.gameValues),
            gameId_level: dataObj.body.level + "_" + dataObj.body.gameId
        })
        console.log(gameData)
        console.log('file data ..',dataObj.file)
        if (dataObj.file) {
            const basePath = `${dataObj.protocol}://${dataObj.get('host')}/images/`
            const fileName = dataObj.file.filename
            gameData.gameValues.image = `${basePath}${fileName}`
        }
       
        await gameData.save()
        const game = await Game.findOne({ _id: dataObj.body.gameId })
        game.levelCount += 1;
        await game.save()
        return {
            status: true,
            data: gameData,
            code: HttpCodes.CREATED
        }
    } catch (e) {
        console.log(e)
        let err
        if (e.name === 'MongoError' && e.code === 11000) {
            err = ResponseMessages.GAME_DATA_DUPLICATION
            code = HttpCodes.BAD_REQUEST
        } else if (e.name == 'ValidationError') {
            err = ResponseMessages.INVALID_DATA
            code = HttpCodes.BAD_REQUEST
        } else {
            err = ResponseMessages.UNABLE_Add_GAME_DATA
            code = HttpCodes.BAD_REQUEST
        }
        return {
            status: false,
            data: err,
            code
        }
    }
}

// exports.addGameData = async (dataObj) => {
//     try {
//         const gameData = new GameData({
//             level: dataObj.body.level,
//             gameId: dataObj.body.gameId,
//             gameValues: JSON.parse(dataObj.body.gameValues),
//             gameId_level: dataObj.body.level + "_" + dataObj.body.gameId
//         })
//         console.log(dataObj.file)
//         if (dataObj.file) {
//             const basePath = `${dataObj.protocol}://${dataObj.get('host')}/images/`
//             const fileName = dataObj.file.filename
//             gameData.gameValues.image = `${basePath}${fileName}`
//         }
//         console.log(gameData)
//         await gameData.save()
//         const game = await Game.findOne({ _id: dataObj.body.gameId })
//         game.levelCount += 1;
//         await game.save()
//         return {
//             status: true,
//             data: gameData,
//             code: HttpCodes.CREATED
//         }
//     } catch (e) {
//         console.log(e)
//         let err
//         if (e.name === 'MongoError' && e.code === 11000) {
//             err = ResponseMessages.GAME_DATA_DUPLICATION
//             code = HttpCodes.BAD_REQUEST
//         } else if (e.name == 'ValidationError') {
//             err = ResponseMessages.INVALID_DATA
//             code = HttpCodes.BAD_REQUEST
//         } else {
//             err = ResponseMessages.UNABLE_Add_GAME_DATA
//             code = HttpCodes.BAD_REQUEST
//         }
//         return {
//             status: false,
//             data: err,
//             code
//         }
//     }
// }

exports.listGameDataByGameId = async (gameId) => {
    try {
        const gameDataListByGameId = await GameData.find({ gameId })
        if (gameDataListByGameId) {
            return {
                status: true,
                data: gameDataListByGameId,
                code: HttpCodes.OK
            }
        } else {
            throw new Error('error')
        }
    } catch (e) {
        let err
        if (e.name == 'ValidationError') {
            err = ResponseMessages.INVALID_DATA
            code = HttpCodes.BAD_REQUEST
        } else {
            err = ResponseMessages.UNABLE_FETCH_GAME_DATA
            code = HttpCodes.BAD_REQUEST
        }
        return {
            status: false,
            data: err,
            code
        }
    }
}

exports.gameMilestoneDetails = async (grade) => {
    try {
        const gameData = await LearningPath.findOne({ grade })
        if (gameData) {
            return {
                status: true,
                data: gameData.milestones,
                code: HttpCodes.OK
            }
        } else {
            throw new Error('error')
        }
    } catch (e) {
        console.log(e)
        let err
        if (e.name == 'ValidationError') {
            err = ResponseMessages.INVALID_DATA
            code = HttpCodes.BAD_REQUEST.MILESTONE_NOT_FOUND
        } else {
            err = ResponseMessages.U
            code = HttpCodes.BAD_REQUEST
        }
        return {
            status: false,
            data: err,
            code
        }
    }
}


exports.addMilestone = async (dataObj) => {
    try {
        const milestone = new Milestone(dataObj.body)
        await milestone.save()
        const learningPath = await LearningPath.findById(dataObj.body.learningPathId)
        learningPath.milestones.push({ milestoneId: milestone._id })
        await learningPath.save()
        return {
            status: true,
            data: milestone,
            code: HttpCodes.CREATED
        }
    } catch (e) {
        let err
        if (e.name == 'ValidationError') {
            err = ResponseMessages.INVALID_DATA
            code = HttpCodes.BAD_REQUEST
        } else {
            err = ResponseMessages.UNABLE_TO_ADD_MILESTONE
            code = HttpCodes.BAD_REQUEST
        }

        return {
            status: false,
            data: err,
            code
        }
    }
}

exports.listMilestone = async (milestoneId) => {
    try {
        const milestone = await Milestone.find({ _id: milestoneId })
        if (milestone) {
            return {
                status: true,
                data: milestone,
                code: HttpCodes.OK
            }
        } else {
            throw new Error('error')
        }
    } catch (e) {
        let err
        if (e.name == 'ValidationError') {
            err = ResponseMessages.INVALID_DATA
            code = HttpCodes.BAD_REQUEST
        } else {
            err = ResponseMessages.UNABLE_FETCH_GAME_DATA
            code = HttpCodes.BAD_REQUEST
        }
        return {
            status: false,
            data: err,
            code
        }
    }
}

exports.listGameDataByGameId = async (gameId) => {
    try {
        const gameDataListByGameId = await GameData.find({ gameId })
        if (gameDataListByGameId) {
            return {
                status: true,
                data: gameDataListByGameId,
                code: HttpCodes.OK
            }
        } else {
            throw new Error('error')
        }
    } catch (e) {
        let err
        if (e.name == 'ValidationError') {
            err = ResponseMessages.INVALID_DATA
            code = HttpCodes.BAD_REQUEST
        } else {
            err = ResponseMessages.UNABLE_FETCH_GAME_DATA
            code = HttpCodes.BAD_REQUEST
        }
        return {
            status: false,
            data: err,
            code
        }
    }
}

exports.addGameLearningPath = async (dataObj) => {
    try {
        const learningPath = new LearningPath(dataObj.body)
        await learningPath.save()
        return {
            status: true,
            data: learningPath,
            code: HttpCodes.CREATED
        }
    } catch (e) {
        let err
        if (e.name === 'MongoError' && e.code === 11000) {
            err = ResponseMessages.LEARNINGPATH_ALREADY_EXIST
            code = HttpCodes.BAD_REQUEST
        } else if (e.name == 'ValidationError') {
            err = ResponseMessages.INVALID_DATA
            code = HttpCodes.BAD_REQUEST
        } else {
            err = ResponseMessages.UNABLE_TO_ADD_LEARNING_PATH
            code = HttpCodes.BAD_REQUEST
        }

        return {
            status: false,
            data: err,
            code
        }
    }
}

exports.updateGameLearningPath = async (dataObj, _id) => {
    try {
        const learningPath = await LearningPath.findOne({ _id })
        if (!learningPath) {
            throw new Error('NO_LEARNING_PATH')
        }
        if (dataObj.body.nodes) {
            learningPath.milestones = dataObj.body.milestones
        } else {
            learningPath.nodes = []
        }

        await learningPath.save()
        return {
            status: true,
            data: learningPath,
            code: HttpCodes.CREATED
        }
    } catch (e) {
        let err
        if (e.name === 'CastError' || e.message === 'NO_LEARNING_PATH') {
            err = ResponseMessages.LEARNINGPATH_NOT_FOUND
            code = HttpCodes.BAD_REQUEST
        } else if (e.name == 'ValidationError') {
            err = ResponseMessages.INVALID_DATA
            code = HttpCodes.BAD_REQUEST
        } else {
            err = ResponseMessages.UNABLE_TO_UPDATE_LEARNING_PATH
            code = HttpCodes.BAD_REQUEST
        }
        return {
            status: false,
            data: err,
            code
        }
    }
}

exports.listLearningPath = async (grade) => {
    try {
        const learningPath = await LearningPath.findOne({ grade: grade })
        if (learningPath) {
            let milestones = []
            let data = {}
            learningPath.milestones.forEach(element => {
                milestones.push(element.milestoneId)
            });
            data.learningPathId = learningPath._id
            data.milestones = milestones
            return {
                status: true,
                data: data,
                code: HttpCodes.OK
            }
        } else {
            throw new Error('error')
        }
    } catch (e) {
        let err
        if (e.name == 'ValidationError') {
            err = ResponseMessages.INVALID_DATA
            code = HttpCodes.BAD_REQUEST
        } else {
            err = ResponseMessages.UNABLE_FETCH_LEARNINGPATH_DATA
            code = HttpCodes.BAD_REQUEST
        }
        return {
            status: false,
            data: err,
            code
        }
    }
}

exports.updateMilestone = async (dataObj, _id) => {
    try {
        const milestone = await Milestone.findOne({ _id })
        if (!milestone) {
            throw new Error('NO_MILESTONE')
        }
        if (dataObj.body.gamedatas) {
            milestone.gamedatas = dataObj.body.gamedatas
        } else {
            milestone.gamedatas = []
        }

        await milestone.save()
        return {
            status: true,
            data: milestone,
            code: HttpCodes.CREATED
        }
    } catch (e) {
        let err
        if (e.name === 'CastError' || e.message === 'NO_MILESTONE') {
            err = ResponseMessages.MILESTONE_NOT_FOUND
            code = HttpCodes.BAD_REQUEST
        } else if (e.name == 'ValidationError') {
            err = ResponseMessages.INVALID_DATA
            code = HttpCodes.BAD_REQUEST
        } else {
            err = ResponseMessages.UNABLE_TO_UPDATE_MILESTONE
            code = HttpCodes.BAD_REQUEST
        }
        return {
            status: false,
            data: err,
            code
        }
    }
}

exports.getGameDataById = async (gameId) => {
    try {
        const gameDataByGameId = await Game.findById(gameId)
        if (gameDataByGameId) {
            return {
                status: true,
                data: gameDataByGameId,
                code: HttpCodes.OK
            }
        } else {
            throw new Error('error')
        }
    } catch (e) {
        let err
        if (e.name == 'ValidationError') {
            err = ResponseMessages.INVALID_DATA
            code = HttpCodes.BAD_REQUEST
        } else {
            err = ResponseMessages.UNABLE_FETCH_GAME_DATA
            code = HttpCodes.BAD_REQUEST
        }
        return {
            status: false,
            data: err,
            code
        }
    }
}

exports.listGameDataByGameDataId = async (gameDataId) => {
    try {
        const gameDataByGameDataId = await GameData.findById(gameDataId)
        if (gameDataByGameDataId) {
            return {
                status: true,
                data: gameDataByGameDataId,
                code: HttpCodes.OK
            }
        } else {
            throw new Error('error')
        }
    } catch (e) {
        let err
        if (e.name == 'ValidationError') {
            err = ResponseMessages.INVALID_DATA
            code = HttpCodes.BAD_REQUEST
        } else {
            err = ResponseMessages.UNABLE_FETCH_GAME_DATA
            code = HttpCodes.BAD_REQUEST
        }
        return {
            status: false,
            data: err,
            code
        }
    }
}

exports.gameLevelDatabyId = async (gameId, level) => {
    try {
        const gameData = await GameData.findOne({ gameId, level })
        console.log(gameData)
        if (gameData) {
            return {
                status: true,
                data: gameData.gameValues,
                code: HttpCodes.OK
            }
        } else {
            throw new Error('error')
        }
    } catch (e) {
        console.log(e)
        let err
        if (e.name == 'ValidationError') {
            err = ResponseMessages.INVALID_DATA
            code = HttpCodes.BAD_REQUEST
        } else {
            err = ResponseMessages.UNABLE_FETCH_LEARNINGPATH_DATA
            code = HttpCodes.BAD_REQUEST
        }
        return {
            status: false,
            data: err,
            code
        }
    }
}

exports.gameLeveDetails = async (grade) => {
    try {
        const gameData = await LearningPath.findOne({ grade }).populate(
            {
                path: 'nodes.gameDataId',
                model: 'GameData',
                populate: {
                    path: 'gameId',
                    model: 'Game',
                    select: 'name'
                }
            })
        if (gameData) {
            return {
                status: true,
                data: gameData.nodes,
                code: HttpCodes.OK
            }
        } else {
            throw new Error('error')
        }
    } catch (e) {
        console.log(e)
        let err
        if (e.name == 'ValidationError') {
            err = ResponseMessages.INVALID_DATA
            code = HttpCodes.BAD_REQUEST
        } else {
            err = ResponseMessages.UNABLE_FETCH_GAME_DATA
            code = HttpCodes.BAD_REQUEST
        }
        return {
            status: false,
            data: err,
            code
        }
    }
}

exports.gameMilestoneDetailsAdmin = async (milestoneid) => {
    try {
        const milestone = await Milestone.findById(milestoneid).populate(
            {
                path: 'gamedatas.gameId',
                model: 'Game'
            }
        )
        if (milestone) {
            console.log(milestone.gamedatas)
            let data = []
            let count = 1;
            milestone.gamedatas.forEach(element => {
                data.push({
                    key: count++,
                    game: element.gameId.name,
                    level: element.level,
                    levelCount: element.gameId.levelCount,
                    gameId: element.gameId._id
                })
            });
            return {
                status: true,
                data: data,
                code: HttpCodes.OK
            }
        } else {
            throw new Error('error')
        }
    } catch (e) {
        console.log(e)
        let err
        if (e.name == 'ValidationError') {
            err = ResponseMessages.INVALID_DATA
            code = HttpCodes.BAD_REQUEST
        } else {
            err = ResponseMessages.UNABLE_FETCH_GAME_DATA
            code = HttpCodes.BAD_REQUEST
        }
        return {
            status: false,
            data: err,
            code
        }
    }
}