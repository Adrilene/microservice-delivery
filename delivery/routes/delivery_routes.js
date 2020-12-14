module.exports = app => {
    const controller = require('../controllers/delivery_controller')();

    app.route('/calculate_fee')
        .get(controller.calculateFee);
}