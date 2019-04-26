var shippo = require('shippo')(process.env.SHIPPO_KEY);

const { convertAddress, convertPackage } = require('./adapters')

module.exports.getCost = (from, to, packages, extras) => {
    var shipment = shippo.shipment.create({
        "address_from": convertAddress(from),
        "address_to": convertAddress(to),
        "parcels": packages.map(convertPackage),
        "extra": extras,
        "async": false
    })
    return shipment  
}

module.exports.confirm = (rateId, callback) => {
    return shippo.transaction.create({
        "rate": rateId,
        "label_file_type": "PDF",
        "async": false
    }, callback)
}
