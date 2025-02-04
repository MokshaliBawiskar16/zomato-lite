const nodeMailer= require("nodemailer")

exports.sendEmail = ({message,to,subject})=>new Promise((resolveContent,reject)=>{
try{
    const mailer =nodeMailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.FROM_EMAIL,
        pass:process.env.EMAIL_PASS
    }
})
 mailer.sendMail({to,subject,html:message},err=>{
    if (err) {
        reject("unable to send email")
    }else{
        console.log("email send");
        resolveContent("email send success") 
    }
 })
}catch(error){
    console.log(error);
    reject("nodemailer error")
 }
})