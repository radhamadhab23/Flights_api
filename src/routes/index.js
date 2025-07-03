const express = require('express');
const v1Routes = require('./v1');
const router = express.Router();
router.use('/v1', v1Routes);
console.log('Loaded main version 1 router');
module.exports = router;