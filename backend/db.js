const { Sequelize, DataTypes, Op } = require('sequelize');
require('dotenv').config();

const connectToDB = () => {
    const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_DB_USERNAME}:${process.env.POSTGRES_DB_PASSWORD}@${process.env.POSTGRES_DB_HOST}:${process.env.POSTGRES_DB_PORT}/slots_db`, {
        dialect: 'postgres',
    });


    const Tutors = sequelize.define('Tutors',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    const Slot = sequelize.define('Slots', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        day: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        tutor1_id: {
            type: DataTypes.INTEGER,
            // references: {
            //     model: Tutors,
            //     key: 'id'
            // }
        },
        tutor1: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        tutor2_id: {
            type: DataTypes.INTEGER,
            // references: {
            //     model: Tutors,
            //     key: 'id'
            // }
        },
        tutor2: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    });



    const Appointments = sequelize.define('Appointments', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        slotId: {
            type: DataTypes.INTEGER,
            allowNull: false,    
        },
        student_email: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });


    return [sequelize, Slot, Appointments, Tutors]
} 


module.exports = {connectToDB}