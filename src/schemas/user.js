
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('email not valid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.includes("password")) {
                throw new Error('Password should not contain string password')
            }
        }
    },
    role: {
        type: String,
        enum: ["parent", "admin"],
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})


userSchema.virtual('child', {
    ref: 'Child',
    localField: '_id',
    foreignField: 'parent'

})
userSchema.statics.findByCredentials = async (email, password, role) => {
    const user = await User.findOne({ email, role })
    if (!user) {
        throw new Error("NO_USER")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error("WRONG_PWD")
    }
    return user
}

userSchema.methods.generateAuthtoken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString(), role: user.role }, process.env.JSON_WEB_TOKEN)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// Hashing plain text password
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.tokens
    delete userObject.password
    delete userObject.createdAt
    delete userObject.updatedAt

    return userObject
}

const User = mongoose.model('User', userSchema)
module.exports = User