const { StatusCodes } = require('http-status-codes');
const { FlightService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

/**
 * POST : /flights 
 */
async function createFlight(req, res) {
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        });

        const response = {
            ...SuccessResponse,
            data: flight
        };
        return res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
        console.error("🔥 Error in createFlight controller:", error);
        const errResponse = {
            ...ErrorResponse,
            error: {
                message: error.message || 'Something went wrong',
                explanation: error.explanation || null,
                stack: error.stack || null
            }
        };
        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(errResponse);
    }
}

/**
 * GET : /flights?trips=BLR-MUM
 */
async function getAllFlights(req, res) {
    try {
        const flights = await FlightService.getAllFlights(req.query);
        const response = {
            ...SuccessResponse,
            data: flights
        };
        return res.status(StatusCodes.OK).json(response);
    } catch (error) {
        console.error("🔥 Error in getAllFlights controller:", error);
        const errResponse = {
            ...ErrorResponse,
            error: {
                message: error.message || 'Something went wrong',
                explanation: error.explanation || null,
                stack: error.stack || null
            }
        };
        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(errResponse);
    }
}

/**
 * GET : /flights/:id 
 */
async function getFlight(req, res) {
    try {
        const flight = await FlightService.getFlight(req.params.id);
        const response = {
            ...SuccessResponse,
            data: flight
        };
        return res.status(StatusCodes.OK).json(response);
    } catch (error) {
        console.error("🔥 Error in getFlight controller:", error);
        const errResponse = {
            ...ErrorResponse,
            error: {
                message: error.message || 'Something went wrong',
                explanation: error.explanation || null,
                stack: error.stack || null
            }
        };
        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(errResponse);
    }
}

/**
 * PATCH : /flights/:id/seats
 */
async function updateSeats(req, res) {
    try {
        const responseData = await FlightService.updateSeats({
            flightId: req.params.id,
            seats: req.body.seats,
            dec: req.body.dec
        });
        const response = {
            ...SuccessResponse,
            data: responseData
        };
        return res.status(StatusCodes.OK).json(response);
    } catch (error) {
        console.error("🔥 Error in updateSeats controller:", error);
        const errResponse = {
            ...ErrorResponse,
            error: {
                message: error.message || 'Something went wrong',
                explanation: error.explanation || null,
                stack: error.stack || null
            }
        };
        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(errResponse);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
};
