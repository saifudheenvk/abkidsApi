const express = require('express')
const router = new express.Router()
const { parentAuth } = require('../middleware/auth')
const gameController = require('../controllers/game')

router.get('/games/listgames', parentAuth, gameController.listGame)
router.get('/games/gamedata/:id', parentAuth, gameController.listGameDataByGameId)
router.get('/games/gamedatabydataid/:id', parentAuth, gameController.listGameDataByGameDataId)
router.get('/games/gameleveldatabyid/:id/:level', parentAuth, gameController.gameLevelDatabyId)


module.exports = router