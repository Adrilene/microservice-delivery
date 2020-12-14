module.exports = () => {
    var delivery_fee = require('../services/calculate_delivery_fee');
    const controller = {};

    controller.calculateFee = (req, res) => {
        delivery_fee.get_coordinates(req.query.address).then(function(resultado){
            var distance = delivery_fee.calculate_distance(resultado);
            value = ((distance * 1.47)).toFixed(2);
            res.status(200).json(value);
        })
        .catch(err => console.log(err));
    };
    
    return controller;
}