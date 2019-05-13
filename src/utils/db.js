const Sequelize = require('sequelize');

const CONNECTION_STRING = process.env.DATABASE_URL || "postgres://postgres:123@localhost:5432/urls";
const db = new Sequelize(CONNECTION_STRING);

db.authenticate()
    .then(()=>{
        console.log('Database Connected!!');
    }).catch((err)=>{
        console.log('Database not connect'+err);
    })


const User = db.define('user_tbl',{
    name:Sequelize.TEXT,
    email:{
        type:Sequelize.TEXT,
        unique:true
    },
    password:Sequelize.TEXT
});


const Urls = db.define('url_tbl',{
    user_id:Sequelize.NUMERIC,
    destination:Sequelize.TEXT,
    hash:Sequelize.TEXT
});

db.sync().then(()=>{
    console.log('Database sync....');
}).catch(e=>{
    console.log('Database not sync....'+e.message);
})

module.exports = {
    User,Urls,db
}