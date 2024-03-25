var moment = require('moment-timezone');

const days = new Map();
days.set('Su',0);
days.set('M',1);
days.set('T',2);
days.set('W',3);
days.set('Th',4);
days.set('F',5);
days.set('Sat',6);

const getAppointmentDate = (appointmentDay) => {
    const currentDay = moment().tz("America/Los_Angeles").day()
    const appointmentDayIdx = days.get(appointmentDay)
    var daysToAdd = 0

    if(currentDay > appointmentDayIdx){
        daysToAdd = appointmentDayIdx-currentDay+7;
    }
    else if(appointmentDayIdx > currentDay){
        daysToAdd = appointmentDayIdx-currentDay;
    }else{
        const currentTime = moment().tz("America/Los_Angeles").format('HH:mm:ss');
        let moment1 = moment(currentTime,'HH:mm::ss')
        let moment2 = moment('17:01:00','HH:mm::ss')
        if(moment1.isAfter(moment2)){
            daysToAdd = 7
        }
    }

    const appointmentDate = moment().tz("America/Los_Angeles").add( daysToAdd,'days').format("MM/DD/YYYY");
    // moment().add( daysToAdd,'days').format("MM/DD/YYYY");
    return appointmentDate

}

module.exports ={getAppointmentDate, days}