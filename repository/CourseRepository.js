const Client = require('../model/Client');
const Course = require('../model/Course');
const ClientCourse = require('../model/ClientCourse');

exports.getCourses = () => {
    return Course.findAll();
};

exports.getCourseById = (idCourse) => {
    return Course.findByPk(idCourse);
};

exports.getCourseByIdExtended = (idCourse) => {
    return Course.findByPk(idCourse,
        {
            include: [{
                model: ClientCourse,
                as: 'clientCourse',
                include: [{
                    model: Client,
                    as: 'client'
                }]
            }]
        });
};

exports.createCourse = (newCourseData) => {
    
    return Course.create({
        name: newCourseData.name,
        description: newCourseData.description,
        startDate: newCourseData.startDate,
        endDate: newCourseData.endDate == '' ? null : newCourseData.endDate
        
    });
};

exports.updateCourse = (idCourse, data) => {
    if(!data.name || !data.description || !data.startDate)
        return Promise.resolve(
            {
            type: 'ValidationError'
            }
        );
        data.idRole = 1;
        data.endDate = data.endDate == '' ? null : data.endDate;
    return Course.update(data, { where: { id: idCourse } });
};

exports.deleteCourse = (idCourse) => {
    return Course.destroy({
        where: { id: idCourse }
    });
};