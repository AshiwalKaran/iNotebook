const mongoose=require('mongoose');
const {Schema}=mongoose;

const NotesSchema=new Schema({
    user:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    tag:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('notes',NotesSchema);