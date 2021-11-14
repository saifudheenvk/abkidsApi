const express = require('express')
const router = new express.Router()
const { parentAuth } = require('../middleware/auth')
const childController = require('../controllers/child')


router.patch('/child/levelupgrade/:id', parentAuth, childController.levelUpgrade)
router.get('/child/:id',parentAuth,childController.getChildrenById)

module.exports = router