const Offer = require('../models/offerModel')

const route = (req, res) => {
    
    if(!req.body) {
        res.status(400).send('Bad request.')
        return;
    }

    

    res.send()
}

module.exports = route