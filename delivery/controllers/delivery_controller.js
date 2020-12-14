module.exports = () => {
    var delivery_fee = require('../services/calculate_delivery_fee');
    delivery_fee = delivery_fee.calculate()
    const controller = {};

    controller.calculateFee = (req, res) => res.status(200).json(delivery_fee);

    return controller;
}