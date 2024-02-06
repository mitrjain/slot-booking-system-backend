const nodemailer = require('nodemailer');


const connectToGmail = async (oauth2Client, OAUTH_EMAIL, GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN)=>{
    var transporter
    var accessToken
    await oauth2Client.getAccessToken().then((value) => {

        // console.log("Access token: "+ value.token)
        
        //set up mailer client
        transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              type: 'OAuth2',
              user: OAUTH_EMAIL,
              clientId: GMAIL_CLIENT_ID,
              clientSecret: GMAIL_CLIENT_SECRET,
              refreshToken: GMAIL_REFRESH_TOKEN,
              accessToken: value.token
          }
        });
        accessToken = value.token
      });
    return {transporter, accessToken}
}


const sendEmailToTutor = async (verifiedSenderEmail ,transporter ,studentDetails,  slotDetails) => {

    const mailOptions = {
      from: verifiedSenderEmail,
      to: 'mitrjain@gmail.com',
      subject: 'Slot Booking Confirmation',
      text: `Hello ${studentDetails.studentName} ,\n\nYou have been booked for a slot.\n\nSlot Details:\nStart Time: ${slotDetails.start_time}\nEnd Time: ${slotDetails.end_time}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
};


const sendEmailToStudent = async (verifiedSenderEmail, transporter ,studentDetails,  slotDetails) => {

    const mailOptions = {
      from: verifiedSenderEmail,
      to: studentDetails.studentEmail,
      subject: 'Slot Booking Confirmation',
      text: `Hello ${studentDetails.studentName} ,\n\nYou have been booked for a slot.\n\nSlot Details:\nStart Time: ${slotDetails.start_time}\nEnd Time: ${slotDetails.end_time}`,
  };
  
  // send mail
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
  });
};


module.exports = {sendEmailToTutor, sendEmailToStudent, connectToGmail}


