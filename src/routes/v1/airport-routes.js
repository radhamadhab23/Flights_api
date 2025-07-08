const router = require('express').Router();
const {AirportController} = require('../../controllers');  
const {AirportMiddleware}=require('../../middlewares');
// /api/v1/airports POST 
router.post('/', AirportMiddleware.validateCreateRequest, AirportController.createAirport);
router.get('/', AirportController.getAirports);
router.get('/:id', AirportController.getAirport);
router.delete('/:id', AirportController.destroyAirport);
router.patch('/:id',AirportController.updateAirport);
console.log('Registered airport routes');
module.exports = router;
