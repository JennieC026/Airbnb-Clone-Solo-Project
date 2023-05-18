const { validationResult } = require('express-validator');

const handleValidationErrors = (req,_res,next)=>{
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        const errors = {};
        console.log(validationErrors)
        validationErrors.array().forEach(error=> errors[error.path] = error.msg);

        const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
    }
    next();
}


module.exports = {
    handleValidationErrors
}