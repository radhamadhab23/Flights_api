const router = require('express').Router();
const {AirplaneController} = require('../../controllers');  
const {AirplaneMiddleware}=require('../../middlewares');
// /api/v1/airplanes POST 
router.post('/', AirplaneMiddleware.validateCreateRequest, AirplaneController.createAirplane);
console.log('Registered airplane routes');
module.exports = router;
