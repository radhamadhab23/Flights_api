const { StatusCodes } = require('http-status-codes');
const { CityService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

/**
 * POST : /cities 
 * req-body {name: 'London'}
 */
async function createCity(req, res) {
  try {
    const city = await CityService.createCity({ name: req.body.name });

    // Clone the object to avoid shared mutations
    const response = { ...SuccessResponse, data: city };

    return res.status(StatusCodes.CREATED).json(response);

  } catch (error) {
    const errorResponse = {
      ...ErrorResponse,
      message: 'Failed to create city',
      data: {},
      error: error.message || error
    };

    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

module.exports = {
  createCity
};
