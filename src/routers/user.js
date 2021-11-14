const express = require('express')
const router = new express.Router()
const userController = require('../controllers/user')
const { auth } = require ('../middleware/auth')
const gameController= require('../controllers/game')

router.post('/user/adduser', userController.createUser)
router.post('/user/login', userController.userLogin)
router.get('/user/getuser', auth, userController.getUser)
router.post('/user/logout', auth, userController.logoutUser)
router.get('/user/leveldetails/:grade', auth, gameController.gameLeveDetails)
router.get('/user/milestonedetails/:grade', auth, gameController.gameMilestoneDetails)


module.exports = router