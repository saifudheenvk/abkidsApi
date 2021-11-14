const mongoose = require('mongoose')
const validator = require('validator')


const milestoneSchema = new mongoose.Schema({
    gamedatas: [{
        _id: false,
        gameId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game'
        },
        level: {
            type: Number,
        }
    }],
    learningPathId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LearningPath'
    }
})

const Milestone = mongoose.model('Milestone', milestoneSchema)
module.exports = Milestone