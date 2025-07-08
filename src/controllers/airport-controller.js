const { StatusCodes } = require('http-status-codes');
const { AirportService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

/**
 * POST : /airports 
 * req-body { name: 'IGI', cityId: 5, code: 'DEL' }
 */
async function createAirport(req, res) {
    try {
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        });

        return res.status(StatusCodes.CREATED).json({
            ...SuccessResponse,
            data: airport
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            ...ErrorResponse,
            error: error.message
        });
    }
}

/**
 * GET : /airports
 */
async function getAirports(req, res) {
    try {
        const airports = await AirportService.getAirports();

        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data: airports
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            ...ErrorResponse,
            error: error.message
        });
    }
}

/**
 * GET : /airports/:id 
 */
async function getAirport(req, res) {
    try {
        const airport = await AirportService.getAirport(req.params.id);

        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data: airport
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            ...ErrorResponse,
            error: error.message
        });
    }
}

/**
 * DELETE : /airports/:id
 */
async function destroyAirport(req, res) {
    try {
        const response = await AirportService.destroyAirport(req.params.id);

        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data: response
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            ...ErrorResponse,
            error: error.message
        });
    }
}

/**
 * PATCH : /airports/:id
 * req-body: { name?, code?, cityId?, address? }
 */
async function updateAirport(req, res) {
    try {
        const response = await AirportService.updateAirport(req.params.id, req.body);

        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data: response
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            ...ErrorResponse,
            error: error.message
        });
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
};
