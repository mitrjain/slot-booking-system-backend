const nodemailer = require('nodemailer');
require('dotenv').config();


const connectToGmail = (oauth2Client, OAUTH_EMAIL, GOOGLE_CLIENT_ID, GOOGLEL_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN)=>{
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
                        clientId: GOOGLE_CLIENT_ID,
                        clientSecret: GOOGLEL_CLIENT_SECRET,
                        refreshToken: GOOGLE_REFRESH_TOKEN,
                        accessToken: value.token
                    }
                });
                // console.log("Created transporter: --")
                // console.log(transporter)
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

const sendTestEmail = async  (verifiedSenderEmail, reciepient, transporter)=>{
    // return new Promise((resolve, reject)=>{
        const mailOptions = {
            from: verifiedSenderEmail,
            to: reciepient,
            subject: 'Test Email: CSSL Slot Booking Confirmation',
            text: `Hello, This is a test email.`,
        };
        
        // send mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return
                // reject(error)
                
            }
            console.log('Message sent: %s', info.messageId);
            // resolve(info.messageId)
            
        });
    // })
    // const mailOptions = {
    //     from: verifiedSenderEmail,
    //     to: reciepient,
    //     subject: 'Test Email: CSSL Slot Booking Confirmation',
    //     text: `Hello, This is a test email.`,
    // };
    
    // // send mail
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('Message sent: %s', info.messageId);
    // });
}


module.exports = {sendEmailToTutor, sendEmailToStudent, connectToGmail, sendTestEmail}


