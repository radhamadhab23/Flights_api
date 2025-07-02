const { StatusCodes } = require('http-status-codes');
const {AirplaneService} = require('../services');
/**
 * post: /airplanes
 * re-body:{modelnumber:
 * 'airbus320',capacity:200}
 * 
 */
async function createAirplane(req, res) {
    try{
        const airplane=await AirplaneService.createAirplane({
            modelNumber:req.body.modelNumber,
            capacity:req.body.capacity
        });
        return res.status(StatusCodes.CREATED).json({
            data:airplane,
            success:true,
            message:'Successfully created an airplane',
            error:{}
        });

    }
    catch(error)
    {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data:{},
            success:false,
            message:error.message,
            error:error
        });
    }
}

module.exports = {
  createAirplane
};
