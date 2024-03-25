const { GoogleSpreadsheet } = require('google-spreadsheet');

var moment = require('moment-timezone');

const connectToSpreadSheet = (sheetId, oauth2Client)=>{
    //set up shreadsheet client
    doc = new GoogleSpreadsheet(sheetId, oauth2Client);
    return new Promise ((resolve, reject) => {
        doc.loadInfo()
            .then(()=>{
                console.log("Connected to spreadsheet: "+doc.title);
                doc = doc.sheetsByIndex[0];
                resolve(doc)
            })
    })
}


const addAppointment = async (doc, selectedTutor, studentDetails, slotDetails, appointmentDate) => {
    const timestamp = moment().tz("America/Los_Angeles").format("MM/DD/YYYY hh:mm:ss")
    const courseCS46A =  studentDetails.courseNumber.includes("CS46A") ? 'Yes' : ''
    const courseCS46B =  studentDetails.courseNumber.includes("CS46B") ? 'Yes' : ''
    const courseCS131 =  studentDetails.courseNumber.includes("CS131") ? 'Yes' : ''
    const courseCS146 =  studentDetails.courseNumber.includes("CS146") ? 'Yes' : ''
    const courseCS151 =  studentDetails.courseNumber.includes("CS151") ? 'Yes' : ''
    const otherCourseWork =  'otherCourseDetails' in studentDetails ? studentDetails.otherCourseDetails : ''


    const row = {
        Timestamp: timestamp,
        Date: appointmentDate,
        Session_Type: 'Appointment',
        Tutor: selectedTutor,
        Student_Name: studentDetails.studentName,
        Email: studentDetails.studentEmail,
        Major: studentDetails.studentMajor,
        '46A': courseCS46A,
        '46B': courseCS46B,
        '131': courseCS131,
        '146': courseCS146,
        '151': courseCS151,
        Others: otherCourseWork,
        Start_time: slotDetails.start_time,
        End_time: slotDetails.end_time,
        Day: slotDetails.day
    }
    const addedRow = await doc.addRow(row)
    return addedRow
    // console.log(addedRow)
}

module.exports = {connectToSpreadSheet, addAppointment}