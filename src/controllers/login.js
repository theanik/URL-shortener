const router = require('express').Router();
const { check } = require('express-validator/check');
const {User} = require('../utils/db');
const {validate} = require('../utils/password');
const _P = require('../utils/promis_err');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const reject_invalide = require('../middlewares/reject_invalide');
//it also use by destructuring
let app_secret = config.app_secret;

let logInValidator = [
    check('email').isEmail(),
    check('password').isLength({min:5})
];

router.post("/login",logInValidator,reject_invalide, async (req,res)=>{
   
    let {email,password} = req.body;
    let[userErr,user] = await _P(User.findOne({
        where:{
            email
        }
    }));

    if(!user && userErr){
        // res.json({
        //     error:true,
        //     message:"user not found",
        //     alert:"error here 3"
        // }).status(401)
        return next(userErr)
    }else{
        console.log(user.password);

        let [salt,hash] = user.password.split('.');
        let {name,email,id} = user;
        let valid = validate(password,hash,salt);

        if(valid){
            let token = jwt.sign({id,email,password},app_secret);
            res.json({
                error:false,
                token,
                user_info:{
                    id,name,email
                }
            }).status(200)
        }else{
            res.json({
                message:"password Incorrect",
                error:true
            }).status(401)

            //using global error handeler

            //next(new Error('Password Invalide'))
        }
    }
})

module.exports = router;