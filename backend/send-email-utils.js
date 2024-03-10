const nodemailer = require('nodemailer');
require('dotenv').config();


const connectToGmail = (oauth2Client, OAUTH_EMAIL, GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN)=>{
    var transporter
    var accessToken
    return new Promise ( (resolve, reject) => {
        oauth2Client.getAccessToken()
            .then((value) => {
                let transporter
                let accessToken = ''
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
                resolve({accessToken:accessToken,transporter:transporter})
            })
        })
}


const sendEmailToTutor = async (verifiedSenderEmail ,transporter ,selectedTutorDetails ,slotDetails, appointmentDate ) => {

    let tutorEmail = 'mitrjain@gmail.com';
    if (process.env.ENVIRONMENT == 'production'){
        tutorEmail = selectedTutorDetails.email;
    }

    const mailOptions = {
      from: verifiedSenderEmail,
      to: tutorEmail,
      subject: 'CSSL Slot Booking Confirmation [Tutor]',
      text: `Hello ${selectedTutorDetails.name} ,\n\nYou have been booked for a CSSL tutoring slot.\n\nSlot Details:\nDate: ${appointmentDate}\nDay: ${slotDetails.day}\nStart Time: ${slotDetails.start_time}\nEnd Time: ${slotDetails.end_time}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
};


const sendEmailToStudent = async (verifiedSenderEmail, transporter ,studentDetails,  slotDetails, appointmentDate) => {

    const mailOptions = {
      from: verifiedSenderEmail,
      to: studentDetails.studentEmail,
      subject: 'CSSL Slot Booking Confirmation [Student]',
      text: `Hello ${studentDetails.studentName} ,\n\nYou have a CSSL tutoring slot booked.\n\nSlot Details:\nDate: ${appointmentDate}\nDay: ${slotDetails.day}\nStart Time: ${slotDetails.start_time}\nEnd Time: ${slotDetails.end_time}`,
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


