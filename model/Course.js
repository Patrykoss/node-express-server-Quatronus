const { HttpError } = require('http-errors');
const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize/sequelize');

const Course = sequelize.define('Course', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Nazwa kursu jest wymagana"
            },
            len: {
                args: [2,70],
                msg: "Nazwa kursu powinna zawierać od 2 do 70 znaków"
            },
        }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Opis kursu jest wymagany"
            },
            len: {
                args: [10,200],
                msg: "Opis kursu powinnien zawierać od 10 do 200 znaków"
            },
        }
    },
    startDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Data rozpoczęcia jest wymagana"
            },
            isDate: {
                args: true,
                msg: "Wymagany format daty"
            }
        }
    },
    endDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        validate: {
            isDate: {
                args: true,
                msg: "Wymagany format daty"
            }
        }
    }
},
    {
        validate: {
        // startDateAfterNowDate() {
        //     if(this.startDate){
        //         let nowDate = new Date(),
        //         month = '' + (nowDate.getMonth() + 1),
        //         day = '' + (nowDate.getDate()),
        //         year = '' + (nowDate.getFullYear());
    
        //         if (month.length < 2)
        //             month = '0' + month;
        //         if (day.length < 2)
        //             day = '0' + day;
        //         const nowString = [year, month, day].join('-');
    
        //         if (this.startDate < nowString) {
        //         throw new Error('Data rozpoczęcia musi być póżniejsza od daty dzisiejszej');
        //             }
        //     }
        // },
        endDateAfterStartDate() {
            if(!this.startDate ){
                if(this.endDate){
                    throw new Error('Należy wpierw wprowadzić datę rozpoczęcia');
                } 
            }else{
                if (this.endDate < this.startDate) {
                    throw new Error('Data zakończenia musi być póżniejsza od daty rozpoczęcia');
                    }
            }
        }
        }
    }
);

module.exports = Course;