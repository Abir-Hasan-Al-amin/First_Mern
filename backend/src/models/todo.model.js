import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    complete:{
        type:Boolean,
        default:false,
    },
    subTodo:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubTodo",
        }
    ]
},{timestamps:true})

export default Todo= mongoose.Model("Todo",todoSchema);