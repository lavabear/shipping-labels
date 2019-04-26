module.exports.checkOrder = () => {
    return function(err, transaction) {
        if(err)
            console.log(err)
        else
            console.log(info, transaction, user)
    }
}