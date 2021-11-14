const Child = require('../schemas/child')
const LearningPath = require('../schemas/learningPath')
const HttpCodes = require('../constants/statusCode')
const ResponseMessages = require('../constants/responseMessage')
const Milestone = require('../schemas/milestone')

exports.addChild = async (dataObj) => {
    try {
        const learningPath = await LearningPath.findOne({ grade: dataObj.body.grade })
        if (!learningPath) {
            throw new Error('NoLearningPath')
        }
        const child = new Child({
            ...dataObj.body,
            parent: dataObj.user._id,
            learningPath: learningPath._id
        })
        await child.save()
        return {
            status: true,
            data: child,
            code: HttpCodes.CREATED
        }
    } catch (e) {
        let err
        if (e.name == 'ValidationError') {
            err = ResponseMessages.INVALID_DATA
            code = HttpCodes.BAD_REQUEST
        } else if (e.message === 'NoLearningPath') {
            err = ResponseMessages.UNABLE_Add_CHILD_TO_GRADE
            code = HttpCodes.BAD_REQUEST
        } else {
            err = ResponseMessages.UNABLE_Add_CHILD
            code = HttpCodes.BAD_REQUEST
        }
        return {
            status: false,
            data: err,
            code
        }
    }
}

exports.updateChild = async (dataObj) => {
    try {
        const data = dataObj.body
        const _id = dataObj.params.id
        const updates = Object.keys(data)
        const updatablles = ['name', 'age', 'grade', 'gender', 'image']
        const isUpdatable = updates.every(update => updatablles.includes(update))
        if (!isUpdatable) {
            throw new Error("INVALID_UPDATES")
        }
        const child = await Child.findOne({ _id, parent: dataObj.user._id })
        if (!child) {
            throw new Error("NO_CHILD")
        }
        updates.forEach((update) => child[update] = data[update])
        await child.save()
        return {
            status: true,
            data: child,
            code: HttpCodes.CREATED
        }
    } catch (e) {
        let err
        if (e.name == 'ValidationError') {
            err = ResponseMessages.INVALID_DATA
            code = HttpCodes.BAD_REQUEST
        } else if (e.message === 'INVALID_UPDATES') {
            err = ResponseMessages.INVALID_UPDATES
            code = HttpCodes.BAD_REQUEST
        } else if (e.message === 'NO_CHILD') {
            err = ResponseMessages.NO_CHILD
            code = HttpCodes.BAD_REQUEST
        } else {
            err = ResponseMessages.UNABLE_UPDATE_CHILD
            code = HttpCodes.BAD_REQUEST
        }
        return {
            status: false,
            data: err,
            code
        }
    }
}

exports.getChildren = async (parentId) => {
    try {
        const children = await Child.find({ parent: parentId })
        return {
            status: true,
            data: children,
            code: HttpCodes.OK
        }
    } catch (e) {
        let err
        if (e.name == 'ValidationError') {
            err = ResponseMessages.INVALID_DATA
            code = HttpCodes.BAD_REQUEST
        } else {
            err = ResponseMessages.UNABLE_UPDATE_CHILD
            code = HttpCodes.BAD_REQUEST
        }
        return {
            status: false,
            data: err,
            code
        }
    }
}

exports.getMilestoneDetails = async (milestoneid) => {
    try {
        const milestone = await Milestone.findById(milestoneid).populate(
            {
                path: 'gamedatas.gameId',
                model: 'Game',
            }
        )
        if (milestone) {
            let data = []
            let count = 1;
            milestone.gamedatas.forEach(element => {
                data.push({
                    key: count++,
                    game: element.gameId.name,
                    level: element.level,
                    levelCount: element.gameId.levelCount,
                    gameId: element.gameId._id,
                    gameImage: element.gameId.image
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