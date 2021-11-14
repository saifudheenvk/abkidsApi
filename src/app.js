const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path');

const app = express()

require("./db/mongoose")
const userRouter = require('./routers/user')
const adminRouter = require('./routers/admin')
const parentRouter = require('./routers/parent')
const childRouter = require('./routers/child')
const gamedRouter = require('./routers/game')

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'resources/images');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.replace(' ', '-')
        cb(null, Date.now() + '-' + fileName)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(cors())
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, '../resources/images')))
app.use(multer({ storage: fileStorage, fileFilter }).single('image'))
app.use(userRouter)
app.use(adminRouter)
app.use(parentRouter)
app.use(childRouter)
app.use(gamedRouter)

module.exports = app