const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})