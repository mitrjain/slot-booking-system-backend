const { Sequelize, DataTypes, Op } = require('sequelize');
require('dotenv').config();

const connectToDB = () => {
    const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_DB_USERNAME}:${process.env.POSTGRES_DB_PASSWORD}@${process.env.POSTGRES_DB_HOST}:${process.env.POSTGRES_DB_PORT}/slots_db`, {
        dialect: 'postgres',
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
    tutor1: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    tutor2: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    });

    return [sequelize, Slot]
} 


module.exports = {connectToDB}