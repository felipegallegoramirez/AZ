const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fupmanagmentcol@gmail.com',
    pass: 'myrpwtzcoydlyeio'
  }
});



const sendcorreo = async (correo,subject,data,add) => {

  const mailOptions = {
    from: 'fupmanagmentcol@gmail.com',
    to: correo,
    subject: subject,
    html: data,
    attachments:add
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
   console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      // do something useful
    }
  });

}



module.exports = sendcorreo