const express = require('express')
const router = new express.Router()
const { adminAuth } = require('../middleware/auth')
const adminController = require('../controllers/admin')
const gameController = require('../controllers/game')

router.post('/admin/addgame', adminAuth,adminController.addGame)
router.get('/admin/listgames',adminAuth,gameController.listGame)
router.post('/admin/addgamedata',adminAuth,adminController.addGameData)
router.get('/admin/listgamedata/:id',adminAuth, gameController.listGameDataByGameId)
router.post('/admin/addlearningpath',adminAuth,adminController.addGameLearningPath)
router.post('/admin/milestone',adminAuth,adminController.addMilestone)
router.get('/admin/milestone/:milestoneid',adminAuth,adminController.listMilestone)
router.patch('/admin/milestone',adminAuth,adminController.updateMilestone)
router.patch('/admin/updatelearningpath/:id',adminAuth,adminController.updateGameLearningPath)
router.get('/admin/game/:id', adminAuth, gameController.getGameDataById)
router.get('/admin/milestonedetails/:milestoneid', adminAuth, gameController.gameMilestoneDetailsAdmin)
router.get('/admin/listlearningpath/:grade',adminAuth,adminController.listLearningPath)

module.exports = router 