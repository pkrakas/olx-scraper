const Offer = require('../models/offerModel')

const route = async (req, res) => {

    const offers = req.body
    
    if(!offers) {
        res.status(400).send('Bad request.')
        return;
    }

    try {
        const rows = await Offer.insertMany(offers, { ordered: false })
        res.send({insertedRows: rows.length})
    } catch(error) {

        res.status(200).send({insertedRows: error.insertedDocs.length})
    }

}

module.exports = route