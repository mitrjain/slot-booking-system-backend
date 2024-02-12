const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { google } = require('googleapis')
const { Sequelize, DataTypes, Op } = require('sequelize');
require('dotenv').config();

const {sendEmailToTutor, sendEmailToStudent, connectToGmail } = require('./send-email-utils')
const { connectToSpreadSheet, addAppointment } = require('./sheet-utils')
const { connectToDB } = require('./db');
const { getAppointmentDate } = require('./utils');
// const {routes, initiliazeRouter} = require('./routes');


const port = 4000;
const SHEET_ID = process.env.SHEET_ID
const OAUTH_EMAIL = process.env.GMAIL_SENDER
const GMAIL_CLIENT_ID = process.env.GMAIL_CLIENT_ID
const GMAIL_CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET
const GMAIL_REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN
const GMAIL_REDIRECT_URI = process.env.GMAIL_REDIRECT_URI


const app = express();
app.use(cors());

/*
**Set Oauth2 Client
*/
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REDIRECT_URI
);

// set refresh token
oauth2Client.setCredentials({
    refresh_token: GMAIL_REFRESH_TOKEN
});


/*
**Connect to Gmail
*/
var accessToken =''
var transporter
connectToGmail(oauth2Client, OAUTH_EMAIL, GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN).then((value)=>{
  transporter=value.transporter
  accessToken=value.accessToken
  // console.log(accessToken)
})

/*
**Connect to Sheets
*/
var sheet
connectToSpreadSheet(SHEET_ID, oauth2Client).then(value => {
  sheet = value.doc
})

/*
**Connect to DB
*/
var sequelize
var Slot
var Appointments
var Tutors
[sequelize, Slot, Appointments, Tutors] = connectToDB()

app.use(bodyParser.json());


/*
**API defintions
*/

//API to get dates
app.get('/api/dates', async (req, res) => {
  const obj = {
    'M': getAppointmentDate('M'),
    'T': getAppointmentDate('T'),
    'Th':getAppointmentDate('Th')
  }
  res.json(obj)
});


// API to get available slots
app.get('/api/slots', async (req, res) => {
  // console.log(process.env.GMAIL_REFRESH_TOKEN)
  try {
    const { day } = req.query;

    const validDays = ['M', 'T', 'Th'];
    let availableSlots
    const currentTime = new Date().toTimeString().split(' ')[0];
    if (!day || !validDays.includes(day)) {
      availableSlots = await Slot.findAll({ 
        where: { 
          [Op.or]: [
          { tutor1: false },
          { tutor2: false }
        ],
        // end_time: {
        //   [Sequelize.Op.gt]: currentTime,
        // }  
      },
      order: [
        ['start_time', 'ASC']
      ],
      attributes: ['id', 'day', 'start_time', 'end_time'], });

    }else if(!validDays.includes(day)){
      return res.status(400).json({ message: 'Invalid or missing day parameter' });
    }
    else{
      availableSlots = await Slot.findAll({ 
        where: { 
          day : day,
          [Op.or]: [
          { tutor1: false },
          { tutor2: false }
        ],
        // end_time: {
        //   [Sequelize.Op.gt]: currentTime,
        // }  
      },
      order: [
        ['start_time', 'ASC']
      ],
      attributes: ['id', 'day', 'start_time', 'end_time'], });

    }    
    res.json(availableSlots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// API to book a slot
app.post('/api/book', async (req, res) => {
  const { selectedSlot } = req.body;
  
  const id = selectedSlot
  const studentDetails = req.body

  try {
    const slot = await Slot.findByPk(id);

    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    //Check to see if the student is not booking the same slot
    const exisitingAppointment = await Appointments.findOne({ where: { slotId: id, student_email: studentDetails.studentEmail } });
    if(exisitingAppointment != null){
      return res.json({ message: 'Slot booking already exists!' });
    }

    // Check which tutor is available
    let selectedTutor = null;
    let selectedTutorDetails = null;


    if (!slot.tutor1 && !slot.tutor2) {
      //randomly select a tuotr
      if(Math.random()>= 0.5){
        selectedTutor = 'tutor1';  
        selectedTutorDetails = await Tutors.findByPk(slot.tutor1_id);
      }
      else{
        selectedTutor = 'tutor2';  
        selectedTutorDetails = await Tutors.findByPk(slot.tutor2_id);
      }
    } else if (!slot.tutor1) {
      selectedTutor = 'tutor2';
      selectedTutorDetails = await Tutors.findByPk(slot.tutor1_id);
    } else if (!slot.tutor2) {
      selectedTutor = 'tutor2';
      selectedTutorDetails = await Tutors.findByPk(slot.tutor2_id);
    } else {
      return res.status(400).json({ message: 'Both tutors are already booked for this slot' });
    }

    // Update the slot with the selected tutor and mark it as booked
    await slot.update({ [selectedTutor]: true });
    await Appointments.create({ slotId: id, student_email: studentDetails.studentEmail});

    const appointmentDate =  getAppointmentDate(slot.day)

    addAppointment(sheet, selectedTutorDetails.name , studentDetails, slot, appointmentDate);
    sendEmailToTutor(OAUTH_EMAIL, transporter ,selectedTutorDetails, slot, appointmentDate);
    sendEmailToStudent(OAUTH_EMAIL, transporter, studentDetails, slot, appointmentDate)

    res.json({ message: 'Slot booked successfully!', tutor: selectedTutor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// API to create a slot
app.post('/api/create', async (req, res) => {
  const { day, start_time, end_time } = req.body;
  try {
    const testData = await Slot.create({ day: day, start_time: start_time, end_time: end_time});
    console.log(" auto-generated ID:", testData.id);
    res.json({ message: 'Slot created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// API to create a slot
app.post('/api/tutors/aidd', async (req, res) => {
  const { name, email} = req.body;
  try {
    const newTutor = await Tutors.create({ name: name, email: email});
    console.log(" auto-generated ID:", newTutor.id);
    res.json({ message: 'Tutor added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Sync the Sequelize model with the database
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
