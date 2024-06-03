const mongoose=require("mongoose");
const nodemailer=require("nodemailer");
require("dotenv").config();

const fileSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,


    },
    tags:{
        type:String
    },
    email:{
        type:String,
    }
});

//post middleware
fileSchema.post("save",async function(doc){
    try{
        console.log("DOC",doc);
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS

            }
        })

        //send mail
        let info=await transporter.sendMail({
            from:`CodeChefs`,
            to:doc.email,
            subject:"New File Uploaded to cloudinary",
            html:`<h2>Hello</h2><p>File Uploaded</p><a href="${doc.imageUrl}">Click Here</a>`
        })
        console.log("Info",info);

    }

    catch(err){
        console.log(err);

    }
})

const file=mongoose.model("file",fileSchema);
module.exports=file;