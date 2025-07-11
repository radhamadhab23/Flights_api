const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { compareTime } = require('../utils/helper/datetime-helpers');

function validateCreateRequest(req, res, next) {
    const missingFields = [];

    if (!req.body.flightNumber) missingFields.push('flightNumber');
    if (!req.body.airplaneId) missingFields.push('airplaneId');
    if (!req.body.departureAirportId) missingFields.push('departureAirportId');
    if (!req.body.arrivalAirportId) missingFields.push('arrivalAirportId');
    if (!req.body.arrivalTime) missingFields.push('arrivalTime');
    if (!req.body.departureTime) missingFields.push('departureTime');
    if (!req.body.price) missingFields.push('price');
    if (!req.body.totalSeats) missingFields.push('totalSeats');

    if (missingFields.length > 0) {
        const error = new AppError(
            missingFields.map(f => `${f} not found in the oncoming request in the correct form`),
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Something went wrong while creating flight',
            error: error
        });
    }
    if(!compareTime(req.body.arrivalTime, req.body.departureTime)) {
        const error = new AppError(
            ['Arrival time must be after departure time'],
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Something went wrong while creating flight',
            error: error
        });
    }

    next();
}

function validateUpdateSeatsRequest(req, res, next) {
  
    if (!req.body.seats) {
        const error = new AppError(
            ['seats not found in the incoming request in the correct form'],
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Something went wrong while updating flight seats',
            error: error
        });
    }

    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateSeatsRequest
};
