const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
    if (!req.body.name) {
        const errorResponse = {
            ...ErrorResponse,
            message: 'Something went wrong while creating city',
            error: new AppError(
                ['City name not found in the incoming request in the correct form'],
                StatusCodes.BAD_REQUEST
            ),
        };

        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    next();
}

function validateUpdateRequest(req, res, next) {
    if (!req.body.name) {
        const errorResponse = {
            ...ErrorResponse,
            message: 'Something went wrong while updating city',
            error: new AppError(
                ['City name not found in the incoming request in the correct form'],
                StatusCodes.BAD_REQUEST
            ),
        };

        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    next();
}

module.exports = {
    validateCreateRequest
};

