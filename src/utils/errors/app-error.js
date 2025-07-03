class AppError extends Error{
    constructor(message,statusCodes){
        super(message);
        this.statusCode=statusCodes;
        this.explanation=explanation;
      
    }
}
module.exports=AppError;