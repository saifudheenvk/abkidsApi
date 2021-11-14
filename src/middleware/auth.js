const jwt = require('jsonwebtoken')
const User = require('../schemas/user')

const parentAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN)
        if (decoded.role != 'parent') {
            throw new Error()
        }
        const user = await User.findOne({ _id: decoded._id, role: decoded.role, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: "Not authenticated" })
    }
}

const adminAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN)
        if (decoded.role != 'admin') {
            throw new Error()
        }
        const user = await User.findOne({ _id: decoded._id, role: decoded.role, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: "Not authenticated" })
    }
}

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN)
        const user = await User.findOne({ _id: decoded._id, role: decoded.role, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: "Not authenticated" })
    }
}

module.exports = { parentAuth, adminAuth, auth }