const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
const { Airplane, Airport, City } = require('../models');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        console.error("🔥 Error while creating flight:", error); // 👈 log actual error
        if (error.name === 'SequelizeValidationError') {
            let explanation = error.errors.map(err => err.message);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter = [];
    const endingTripTime = " 23:59:00";

    // filter by route: trips=MUM-DEL
    if (query.trips) {
        const [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
        // Check if departure and arrival airports are the same
        if (departureAirportId === arrivalAirportId) {
            throw new AppError('Departure and Arrival airports cannot be the same', StatusCodes.BAD_REQUEST);
        }
    }

    // filter by price: price=1000-5000
    if (query.price) {
        const [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [
                minPrice,
                maxPrice === undefined ? 20000 : maxPrice
            ]
        };
    }

    // filter by available seats
    if (query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        };
    }

    // filter by departure date
    if (query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [
                query.tripDate,
                query.tripDate + endingTripTime
            ]
        };
    }
    //fetch complete data of arrival and departure airports in the get all flights
    const include = [
        {
            model: Airplane,
            as: 'airplaneDetail'
        },
        {
            model: Airport,
            as: 'departureAirport',
            include: {
                model: City,
                as: 'city'
            }
        },
        {
            model: Airport,
            as: 'arrivalAirport',
            include: {
                model: City,
                as: 'city'
            }
        }
    ];

    // sort filter
    if (query.sort) {
        const params = query.sort.split(',');
        sortFilter = params.map(param => param.split('_'));
    }

    console.log("🔍 Filters:", customFilter);
    console.log("🧮 Sorting:", sortFilter);

    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter, include);
        return flights;
    } catch (error) {
        console.error("🔥 Error while fetching flights:", error);
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id) {
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('The flight you requested is not present', error.statusCode);
        }
        console.error("🔥 Error while fetching flight:", error);
        throw new AppError('Cannot fetch data of the flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateSeats(data) {
    try {
        const response = await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
        return response;
    } catch (error) {
        console.error("🔥 Error while updating seats:", error);
        throw new AppError('Cannot update data of the flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
};
