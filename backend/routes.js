const express = require('express');
const router = express.Router();

var Slot, sheet, OAUTH_EMAIL, transporter
const initiliazeRouter = ( obj  ) => {
    Slot = obj.Slot
    sheet = obj.sheet
    OAUTH_EMAIL = obj.OAUTH_EMAIL
    transporter = obj.transporter
}


// API to get available slots
router.get('/slots', async (req, res) => {
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
router.post('/book', async (req, res) => {
    const { selectedSlot } = req.body;

    const id = selectedSlot
    const studentDetails = req.body

    try {
        const slot = await Slot.findByPk(id);

        if (!slot) {
        return res.status(404).json({ message: 'Slot not found' });
        }

        // Check which tutor is available
        let selectedTutor = null;

        if (!slot.tutor1) {
        selectedTutor = 'tutor1';
        } else if (!slot.tutor2) {
        selectedTutor = 'tutor2';
        } else {
        return res.status(400).json({ message: 'Both tutors are already booked for this slot' });
        }

        // Update the slot with the selected tutor and mark it as booked
        await slot.update({ [selectedTutor]: true });

        addAppointment(sheet,'Mit', studentDetails, slot);
        sendEmailToTutor(OAUTH_EMAIL, transporter ,studentDetails, slot);
        sendEmailToStudent(OAUTH_EMAIL, transporter, studentDetails, slot)

        

        res.json({ message: 'Slot booked successfully!', tutor: selectedTutor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/create', async (req, res) => {
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

module.exports = {router, initiliazeRouter}

