const jwt = require('jsonwebtoken');
const {app_secret} = require('../config.json');

module.exports = function(req,res,next){
    if(!req.header('auth-token')){
        // return res.json({
        //     message:"user not authonticate",
        //     error:true,
        //     alert:"error here 4"
        // }).status(401)

        return next(new Error('User not authonticated'));
    }

    let token = req.header('auth-token');

    jwt.verify(token,app_secret,(err,decodedUserInfo)=>{
        if(err){
            // return res.json({
            //     message:"user not authonticate",
            //     error:true,
            //     err:err.message,
            //     alert:"error here 5"
            // }).status(401)

            return next(err);
        }else{
            req.user_info = decodedUserInfo;
            console.log(decodedUserInfo);
            next()
        }
    })
}