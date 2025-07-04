const router = require('express').Router();
const {AirplaneController} = require('../../controllers');  
const {AirplaneMiddleware}=require('../../middlewares');
// /api/v1/airplanes POST 
router.post('/', AirplaneMiddleware.validateCreateRequest, AirplaneController.createAirplane);
router.get('/', AirplaneController.getAirplanes);
router.get('/:id', AirplaneController.getAirplane);
router.delete('/:id', AirplaneController.destroyAirplane);
router.patch('/:id',AirplaneController.updateAirplane);
console.log('Registered airplane routes');
module.exports = router;
