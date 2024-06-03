const express=require("express");
const app=express();
require("dotenv").config();

const port=process.env.PORT||4000;

app.use(express.json());
const fileUpload=require("express-fileupload");

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp'

}));

const db=require("./config/database");
db.connect();

const cloudinary=require("./config/cloud");
cloudinary.cloudinaryConnect();

const Upload=require("./routes/fileUpload");
app.use("/api/v1/upload",Upload);
app.listen(port,()=>{
    console.log(`App is running at ${port}`)
})
