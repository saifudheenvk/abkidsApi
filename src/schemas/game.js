const mongoose = require('mongoose')
const validator = require('validator')

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
    },
    levelCount :{
        type: Number,
        default: 0
    },
    requiredFields: [{
        fieldName: {
            type: String,
            required: true
        },
        fieldType: {
            type: String,
            required: true
        }

    }]
})

gameSchema.virtual('gameData', {
    ref: 'GameData',
    localField: '_id',
    foreignField: 'gameId'
})

const Game = mongoose.model('Game', gameSchema)
module.exports = Game