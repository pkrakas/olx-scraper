const mongoose = require('mongoose')

const offerModel = mongoose.Schema({
    title: String,
    price: Number,
    location: String,
    url: {
        type: String,
        unique: true
    }
})

module.exports = mongoose.model('Offer', offerModel)