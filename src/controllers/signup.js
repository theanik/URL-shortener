
const router = require('express').Router();
const { check, validationResult } = require('express-validator/check');
const {User} = require('../utils/db');
const {generate} = require('../utils/password');
const _P = require('../utils/promis_err');
const reject_invalide = require('../middlewares/reject_invalide');
const signupValidator = [
    check('name').exists(),
    check('email').isEmail(),
    check('password').isLength({min:5})
];

router.post("/signup",signupValidator, reject_invalide,async (req,res)=>{
    // const errors = validationResult(req);

    // if(!errors.isEmpty()){
    //     return res.status(422)
    //             .json({errors:errors.array(),alert:"error here"})
        
    // }

    let passGen = generate(req.body.password);

    let password = `${passGen.salt}.${passGen.hash}`;

    let {name,email} = req.body;

    let [ucErr,userCreated] = await _P(User.create({
        name,email,password
    }));
    if(ucErr && !userCreated){
        //res.status(400).json({error:true,message:ucErr.message,alert:"error here 1"});
        next(ucErr);
    }
    else{
        res.json({message:"User created",error:false});
    }

})

module.exports = router;