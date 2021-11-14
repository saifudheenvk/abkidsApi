const mongoose = require('mongoose')
const validator = require('validator')
const Milestone = require('./milestone')
const GameData = require('./gameData')


const childSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 1) {
                throw new Error('age not valid')
            }
        }
    },
    grade: {
        type: String,
        required: true,
        enum: ["prekg", "kg", "1st", "2nd"]
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    reward: {
        type: Number,
        default: 0
    },
    currentMilestone: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Milestone'
    },
    learningPathFinished: {
        type: Boolean,
        default: false,
        required: true,
    },
    gameData: [{
      gameDataId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameData'
    },
    isCompleted: {
        type : Boolean,
        default: false
    }
    }],
    image: {
        type: String,
    },
    recentGames: [{
        gameId: {
            type: Number
        }
    }],
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})
const Child = mongoose.model('Child', childSchema)
module.exports = Child