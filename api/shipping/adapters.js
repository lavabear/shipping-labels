module.exports.convertAddress = ({
    name, company, street, line2, line3, city,
    postalCode, state, country, phone, email, isResidential
}) => {
    /*
        street_no: streetNumber

        Street number of the addressed building. 
        This field can be included in street1 for all carriers except for DHL Germany.
    */
    return {
        name, company, city, state, country, phone, email, 
        street1: street,
        street2: line2,
        street3: line3,
        zip: postalCode,
        is_residential: isResidential,
        validate, metadata, 
    }
}

module.exports.convertPackage = ({width, height, length, weight}) => {
    return {
        width, height, length, weight
    }
}