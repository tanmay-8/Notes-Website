const mongoose = require('mongoose')
const {Schema} = mongoose


const page = {
    subtitle:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
}

const multipageSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true,
    },
    pages:{
        type:[page],
        required:true,
        default:[]
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('multipage',multipageSchema);