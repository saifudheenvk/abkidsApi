const express = require('express')
const router = new express.Router()
const { parentAuth } = require('../middleware/auth')
const parentController = require('../controllers/parent')

router.post('/parent/addchild', parentAuth,parentController.addChild)
router.get('/parent/getchildren', parentAuth,parentController.getChildren)
router.patch('/parent/updatechild/:id', parentAuth,parentController.updateChild)
router.get('/parent/milestonedetails/:milestoneid', parentAuth,parentController.getMilestoneDetails)

module.exports = router 