const router = require('express').Router();
const { check } = require('express-validator/check');
const {Urls} = require('../utils/db');
const _P = require('../utils/promis_err');
const reject_invalide = require('../middlewares/reject_invalide');
const path           = require('path');
const validateData = [
    check('url').isURL()
];

router.post('/api/v1/redirects',validateData,reject_invalide,async (req,res,next)=>{
    let user_id = req.user_info.id;
    let destination = req.body.url;
    let timestamp = Date.now()/1000;
    let hash = parseInt(`${user_id}${timestamp}`).toString(32);

    let [createErr,create] = await _P(Urls.create({
        user_id,destination,hash
    }));

    if(createErr && !create){
        //next(createErr);
        res.json({
            error:true,
            message:"error hweew"
        })
    }else{
        res.json({
            message:"deriction create successfully",
            hash
        })
    }
});

// router.post('/v1',(req,res)=>{
//     let url = req.body.url;
//     res.json({
//         message:"okk",
//         url:url
//     })
// })

router.get('/api/v1/redirects',async (req,res)=>{
    let [dbErr,showDir] = await _P(Urls.findAll({
        where:{
            "user_id":req.user_info.id
        }
    }));

    if(dbErr && !showDir) return next(dbErr);
    return res.json(
        showDir.map(d=>{
            return {
                id:d.id,
                hash:d.hash,
                destination:d.destination,
                create_at:d.createdAt
            }
        })
    )
})

router.get(`/:hash`, async (req,res,next)=>{
    let URLhash = req.param('hash');
    console.log(URLhash);

    let [dbErr,hashDirection] = await _P(Urls.findOne({
        where:{
            'hash':URLhash
        }
    }));

    if(dbErr && !hashDirection) return next(dbErr);
    if(hashDirection){
        console.log(hashDirection)
        res.redirect(301,hashDirection.dataValues.destination);
    }else{
        next();
    }
})

router.get('*',(req,res)=>{
    res.sendFile(
        path.resolve(__dirname,'../../frontend/build/index.html')
    )
})
module.exports = router;