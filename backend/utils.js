var moment = require('moment'); // require

const days = new Map();
days.set('Su',0);
days.set('M',1);
days.set('T',2);
days.set('W',3);
days.set('Th',4);
days.set('F',5);
days.set('Sat',6);


const getAppointmentDate = (appointmentDay) => {
    const currentDay = new Date().getDay();
    const appointmentDayIdx = days.get(appointmentDay)
    console.log(currentDay)
    console.log(appointmentDayIdx)
    var daysToAdd =0

    if(currentDay > appointmentDayIdx){
        daysToAdd = appointmentDayIdx-currentDay+7;
    }
    else if(appointmentDayIdx > currentDay){
        daysToAdd = appointmentDayIdx-currentDay;
    }

    const appointmentDate = moment().add( daysToAdd,'days').format("MM/DD/YYYY");
    return appointmentDate

}

module.exports ={getAppointmentDate}