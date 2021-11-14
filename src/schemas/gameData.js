const mongoose = require('mongoose')
const validator = require('validator')
const Game = require('./game')

const gameDataSchema = new mongoose.Schema({
    level: {
        type: Number,
        required:true
    },
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Game'
    },
    gameValues: {
        type: Object
    },
    gameId_level : {
        type:String,
        unique : true
    }
})


// Checking reference Game Id is valid or not
gameDataSchema.path('gameId').validate( async (value, respond) => {
    try{
        const gameList = await Game.countDocuments({_id: value})
        return gameList > 0;
        
    } catch(e) {
        throw e
    }

}, 'Not Valid Game');

const GameData = mongoose.model('GameData', gameDataSchema)
module.exports = GameData