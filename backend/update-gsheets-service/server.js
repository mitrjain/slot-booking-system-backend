const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { google } = require('googleapis')
require('dotenv').config();

const { connectToSpreadSheet, addAppointment } = require('./sheet-utils')


const port = 8080;
const SHEET_ID = process.env.SHEET_ID
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

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.post('/api/record', async (req, res) => {
    const { selectedTutorDetails, studentDetails, slot, appointmentDate} = req.body;
  
    try {
      if(!selectedTutorDetails || !slot || !appointmentDate || !studentDetails){
        return res.status(422).json({ message: 'One or JSON request parameters is missing' });
      }
      
      let addedRow = await addAppointment(sheet, selectedTutorDetails.name , studentDetails, slot, appointmentDate);
  
      res.json({ message: 'Record added' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });




/*
**Connect to Sheets
*/


var sheet
const setUpSheets = (doc)=>{
    sheet = doc
}

connectToSpreadSheet(SHEET_ID, oauth2Client)
  .then(setUpSheets)
  .then(
    app.listen(port, () => {
        console.log(` 'Update Google Sheets Service' is running on port ${port}`);
    }))

  



