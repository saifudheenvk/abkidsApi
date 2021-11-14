const mongoose = require('mongoose')
const validator = require('validator')
const Milestone = require('./milestone')

const learningPathSchema = new mongoose.Schema({
    grade: {
        type: String,
        required: true,
        unique: true,
        enum: ["prekg", "kg", "first", "second"]
    },
    milestones: [{
        _id: false,
        milestoneId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Milestone'
        }

    }]
})
const LearningPath = mongoose.model('LearningPath', learningPathSchema)
module.exports = LearningPath