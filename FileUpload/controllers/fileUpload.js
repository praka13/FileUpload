const File=require("../models/file");
const cloudinary=require("cloudinary").v2;

// Create localFileUpload
exports.localFileUpload=async (req,res)=>{
    try{

        //fetch the file
        const file=req.files.file;
        console.log(file);

        let path=__dirname+"/files/"+Date.now()+'.'+`${file.name.split('.')[1]}`;
        console.log(path);

        file.mv(path,(err)=>{
            console.log(err);
        });

        res.json({
            success:true,
            message:"local file uploaded successfully"
        })


    }

    catch(err){
        console.log(err);

    }
}

//image upload handler

function isFileTypeSupported(type,supportedType){
    return supportedType.includes(type);
}

async function uploadFileToCloudinary(file,folder,quality){



    const options={folder};
    console.log("temp file path",file.tempFilePath);
    if(quality){
        options.quality=quality;   
    }
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);

}

exports.imageUpload=async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        console.log(name,email,tags);
        const file=req.files.imageFile;
        console.log(file);
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log(fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){

            return res.status(400).json({
                success:false,
                message:"File format not supported"
            })

        }

        //file format matches

        const response=await uploadFileToCloudinary(file,"AdityaFirst");
        console.log(response);

        //save entry in db
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image successfully uploaded"

        })





    }
    catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Some error occurred"
        })

    }
}

exports.videoUpload=async (req,res)=>{
    try{

        const {name,tags,email}=req.body;
        console.log(name,email,tags);
        const file=req.files.videoFile;
        console.log(typeof(file.size));
        const supportedTypes=["mp4","mov"];
        const fileType=file.name.split('.')[1];
        console.log(fileType);

        if(isFileTypeSupported(fileType,supportedTypes) && file.size<7000000) {

            const response=await uploadFileToCloudinary(file,"AdityaFirst");
            // console.log(response);
             console.log(response);
                     //save entry in db
                     const fileData=await File.create({
                         name,
                         tags,
                         email,
                         imageUrl:response.secure_url,
                         
                     })
             
                     res.status(200).json({
                         success:true,
                         imageUrl:response.secure_url,
                         message:"Video successfully uploaded"
             
                     })

        }
        else{
            res.status(400).json({
                success:false,
                message:"failed"
            })
  
        }



    }

    catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Some error occurred"
        })

    }

}

exports.imageSizeReducer=async (req,res)=>{
    try{

        const {name,tags,email}=req.body;
        console.log(name,email,tags);
        const file=req.files.imageFile;
        console.log(file);
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log(fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){

            return res.status(400).json({
                success:false,
                message:"File format not supported"
            })

        }

        //file format matches

        const response=await uploadFileToCloudinary(file,"AdityaFirst",90);
        console.log(response);

        //save entry in db
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image successfully uploaded"

        })

        



    }
    catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Some error occurred"
        })

    }
}