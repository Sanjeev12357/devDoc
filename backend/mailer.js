const nodemailer=require("nodemailer");

const mailSender=async(email,title,body)=>{
    try{
        let transporter=nodemailer.createTransport({
            host:"smtp.gmail.com",
            auth:{
                user:"sanjeevsinghsaini48@gmail.com",
                pass:"nrik taxn rncc xvud",
            }
        })

        let info=await transporter.sendMail({
            from:'devDoc ',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })
        console.log(info);
        return info;
    }catch(error){
        console.log(error.message);

    }
}

module.exports=mailSender;