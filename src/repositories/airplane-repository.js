const crudRepository = require('./crud-repository');
const {Airplane}=require('../models');
const { StatusCodes } = require('http-status-codes');
class AirplaneRepository extends crudRepository
{
      constructor()
      {
        super(Airplane);
      }
}
module.exports=AirplaneRepository;