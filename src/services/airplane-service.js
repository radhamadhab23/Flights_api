const {AirplaneRepository}=require('../repositories');
const airplaneRepository=new AirplaneRepository();
const {StatusCodes}=require('http-status-codes');
const {AppError}=require('../utils/errors/app-error');
async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        if(error.name=='SequelizeValidationError' )
        { let explanation=[];
            console.log(error);
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            });
            console.log(explanation);
            throw new AppError('cannot create a new airplane object',StatusCodes.BAD_REQUEST);

        }
        throw new AppError('cannot create a new airplane object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports=
{
    createAirplane
}