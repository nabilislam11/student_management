const mongoose =require("mongoose")
const {Schema} =mongoose;
const userSchema =new Schema({
    username:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        required:true,
        min:[5],
        max:[10],
        
    },
    islogin:{
        type:Boolean,
        default:false
    }
    
})
module.exports =mongoose.model("User",userSchema)