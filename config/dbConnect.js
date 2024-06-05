const mongoose = require('mongoose');

const dbConnect = async ()=>{
    var mongoDB = process.env.db;
    mongoose.connect(mongoDB).then(()=>{
        console.log("Connected to database....");
    }).catch((error)=>{
        console.error(error)
    });

}
module.exports  = dbConnect