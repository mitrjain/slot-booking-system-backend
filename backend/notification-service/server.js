const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { google } = require('googleapis')
require('dotenv').config();

const {sendEmailToTutor, sendEmailToStudent, connectToGmail, sendTestEmail } = require('./send-email-utils')


const port = 8080;
const OAUTH_EMAIL = process.env.GMAIL_SENDER
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLEL_CLIENT_SECRET = process.env.GOOGLEL_CLIENT_SECRET
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI


const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLEL_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
);

// set refresh token
oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN
});


/*
**Connect to Gmail
*/
var transporter
const setupMailConfig = (data) => {
  transporter = data.transporter

  return new Promise((resolve, reject)=>{
    resolve(transporter)
  })
}

const app = express();
app.use(cors());

app.post('/api/tutor', async (req, res) => {
    const { selectedTutorDetails, slot, appointmentDate} = req.body;
  
    try {
      if(!selectedTutorDetails || !slot || !appointmentDate){
        return res.status(422).json({ message: 'One or JSON request parameters is missing' });
      }
      
      await sendEmailToTutor(OAUTH_EMAIL, transporter ,selectedTutorDetails, slot, appointmentDate);
  
      res.json({ message: 'Email sent sucessfully', tutor: selectedTutor });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

app.post('/api/student', async (req, res) => {
    const { studentDetails, slot, appointmentDate} = req.body;
    try {
      if(!studentDetails || !slot || !appointmentDate){
        return res.status(422).json({ message: 'One or JSON request parameters is missing' });
      }

      await sendEmailToStudent(OAUTH_EMAIL, transporter, studentDetails, slot, appointmentDate)
      res.json({ message: 'Email sent sucessfully', student: studentDetails });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

app.post('/api/test', async (req, res) => {
    try {
    await sendTestEmail(OAUTH_EMAIL,'mitrjain@gmail.com',transporter)
    res.json({ message: 'Email sent sucessfully', student: 'mitrjain@gmail.com'});

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

connectToGmail(oauth2Client, OAUTH_EMAIL, GOOGLE_CLIENT_ID, GOOGLEL_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN)
  .then(setupMailConfig)
  .then((transporter)=>{
    sendTestEmail(OAUTH_EMAIL,'mitrjain@gmail.com',transporter)
    })
  .then(
    app.listen(port, () => {
        console.log(`Notification Service is running on port ${port}`);
    }))

