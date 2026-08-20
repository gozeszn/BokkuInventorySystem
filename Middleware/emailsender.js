const transporter = require('../Config/emailConfig');

const sendEmail = async(to,subject,text) =>{
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    };
    try{
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully'); 
    }catch(error){
        console.error('Error sending email:', error);
        throw new Error('Email sending failed');    
    }
    }

    module.exports = sendEmail;
