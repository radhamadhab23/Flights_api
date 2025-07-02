const express = require('express');
const router = express.Router();
const {InfoController} = require('../../controllers');
// Importing the Airplane routes
const airplaneRoutes = require('./airplane-routes');
router.get('/info', InfoController.info);
router.use('/airplanes', airplaneRoutes);
module.exports=router;