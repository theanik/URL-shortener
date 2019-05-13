
const {validationResult } = require('express-validator/check');
module.exports = function(req,res,next){
    const errors = validationResult(req);

    if(!errors.isEmpty()){
       return res.json({
            error:errors.array(),
            alert:"error here 2"
        }).status(422)
    }else{
        next();
    }

}