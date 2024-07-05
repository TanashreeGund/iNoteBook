const mongoose = require('mongoose');
const uri='mongodb://localhost:27017/iNotebook?readPreference=primary&appName=MongoDBCompass&directConnection=true';
/*
promises
const connectToMongo = () => {
    mongoose.connect(uri)
        .then(() => {
        console.log("Connected to Mongo server");
    })
    .catch(() => {
        console.log("Failed to connect to Mongo server");
    });
}*/
//Async-Await
const connectToMongo= async ()=>{
    await mongoose.connect(uri, console.log("Connected to Mongo server successfully!")
    );
}


module.exports = connectToMongo;