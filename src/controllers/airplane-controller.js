const { StatusCodes } = require('http-status-codes');

const { AirplaneService } = require('../services');
const getSuccessResponse = require('../utils/common/success-response');
const getErrorResponse = require('../utils/common/error-response');

/**
 * POST : /airplanes 
 * req-body {modelNumber: 'airbus320', capacity: 200}
 */
async function createAirplane(req, res) {
    try {
        const airplane = await AirplaneService.createAirplane(req.body);
        const SuccessResponse = getSuccessResponse();
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        const ErrorResponse = getErrorResponse();
        ErrorResponse.error = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

/**
 * POST : /airplanes
 * req-body {}
 */
async function getAirplanes(req, res) {
    try {
        const airplanes = await AirplaneService.getAirplanes();
        const SuccessResponse = getSuccessResponse();
        SuccessResponse.data = airplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        const ErrorResponse = getErrorResponse();
        ErrorResponse.error = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

/**
 * POST : /airplanes/:id 
 * req-body {}
 */
async function getAirplane(req, res) {
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id);
        const SuccessResponse = getSuccessResponse();
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        const ErrorResponse = getErrorResponse();
        ErrorResponse.error = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

/**
 * DELETE : /airplanes/:id
 * req-body {}
 */
async function destroyAirplane(req, res) {
    try {
        const airplanes = await AirplaneService.destroyAirplane(req.params.id);
        const SuccessResponse = getSuccessResponse();
        SuccessResponse.data = airplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        const ErrorResponse = getErrorResponse();
        ErrorResponse.error = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function updateAirplane(req, res) {
    try {
        const airplane = await AirplaneService.updateAirplane(req.params.id, req.body);
        const SuccessResponse = getSuccessResponse();
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        const ErrorResponse = getErrorResponse();
        ErrorResponse.error = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}
