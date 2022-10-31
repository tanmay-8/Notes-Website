const mongoose = require('mongoose')
const {Schema} = mongoose


const NoteSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    subtitle:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    isfavourite:{
        type:Boolean,
        default:false
    },
    tags:{
        type:String,
    }
})


const Note = mongoose.model('note',NoteSchema);
module.exports = Note;