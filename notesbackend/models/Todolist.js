const mongoose = require('mongoose')
const {Schema} = mongoose

const Task = {
    task:{
        type:String,
        required:true
    },
    iscompleted:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    }
}

const TodoSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    tasks:{
        type:[Task],
        required:true,
        default:[]
    },
    date:{
        type:Date,
        default:Date.now
    },
    iscompleted:{
        type:Boolean,
        default:false
    }
})


const TodoList = mongoose.model('todolist',TodoSchema);
module.exports = TodoList;