const mongoose = require('mongoose');


const mongoURI ='mongodb://localhost:27017/notesapp?directConnection=true&readPreference=primaryPreferred'

const connectToMongo = ()=>{
     mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo");
     })
}

module.exports = connectToMongo;