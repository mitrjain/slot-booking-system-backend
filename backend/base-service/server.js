const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes, Op } = require('sequelize');
require('dotenv').config();
var moment = require('moment-timezone');

const { connectToDB } = require('./db');
const { getAppointmentDate, days } = require('./utils');
// const {routes, initiliazeRouter} = require('./routes');

const port = 8080;
const NOTIFICATION_SERVICE_HOST = process.env.NOTIFICATION_SERVICE_HOST
const UPDATE_SHEETS_SERVICE_HOST = process.env.UPDATE_SHEETS_SERVICE_HOST

const app = express();
app.use(cors());


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
  try {
    const { day } = req.query;

    const validDays = ['M', 'T', 'Th'];
    let availableSlots
    const currentTime = moment().tz("America/Los_Angeles").format('HH:mm:ss');
  
    if (!day || !validDays.includes(day)) {
      availableSlots = await Slot.findAll({ 
        where: { 
          [Op.or]: [
          { tutor1: false },
          { tutor2: false }
        ],
        start_time: {
          [Sequelize.Op.gt]: currentTime,
        }  
      },
      order: [
        ['start_time', 'ASC']
      ],
      attributes: ['id', 'day', 'start_time', 'end_time'], });

    }else if(!validDays.includes(day)){
      return res.status(400).json({ message: 'Invalid or missing day parameter' });
    }
    else{

      const presentDay = moment().tz("America/Los_Angeles").day();
      const queriedDay = days.get(day)


      let moment1 = moment(currentTime,'HH:mm::ss')
      let moment2 = moment('17:01:00','HH:mm::ss')

      if(presentDay == queriedDay && moment1.isBefore(moment2) ){
        availableSlots = await Slot.findAll({ 
          where: { 
            day : day,
            [Op.or]: [
            { tutor1: false },
            { tutor2: false }
          ],
          start_time: {
            [Sequelize.Op.gt]: currentTime,
          }  
        },
        order: [
          ['start_time', 'ASC']
        ],
        attributes: ['id', 'day', 'start_time', 'end_time'], });
      }
      else{
        availableSlots = await Slot.findAll({ 
          where: { 
            day : day,
            [Op.or]: [
            { tutor1: false },
            { tutor2: false }
          ]
        },
        order: [
          ['start_time', 'ASC']
        ],
        attributes: ['id', 'day', 'start_time', 'end_time'], });

      }
      

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

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    };

    const addAppointmentData = {
      selectedTutorDetails: selectedTutorDetails,
      studentDetails: studentDetails,
      slot: slot,
      appointmentDate: appointmentDate
    }
    axios.post(`${UPDATE_SHEETS_SERVICE_HOST}/api/record`,
    addAppointmentData,
    {
      headers: headers
    })

    const sendEmailToTutorData = {
      selectedTutorDetails: selectedTutorDetails,
      slot: slot,
      appointmentDate: appointmentDate
    }
    axios.post(`${NOTIFICATION_SERVICE_HOST}/api/tutor`,
    sendEmailToTutorData,
    {
      headers: headers
    })

    const sendEmailToStudentData = {
      studentDetails: studentDetails,
      slot: slot,
      appointmentDate: appointmentDate
    }
    axios.post(`${NOTIFICATION_SERVICE_HOST}/api/student`,
    sendEmailToStudentData,
    {
      headers: headers
    })

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
