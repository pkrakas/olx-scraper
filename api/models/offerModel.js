const mongoose = require('mongoose')

const offerModel = mongoose.Schema({
    title: String,
    price: String,
    location: String,
    url: {
        type: String,
        unique: true,
        dropDups: true
    }
})

module.exports = mongoose.model('Offer', offerModel)