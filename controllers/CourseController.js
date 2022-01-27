const CourseRepository = require('./../repository/CourseRepository');

exports.getCourses = (req, res, next) => {
    CourseRepository.getCourses()
        .then(courses => {
            res.status(200).json(courses);
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
};

exports.getCourseById = (req, res, next) => {
    const idCourse = req.params.idCourse;
    CourseRepository.getCourseById(idCourse)
        .then(course => {
            if (!course)
                res.status(404).json('Course with id: ' + idCourse + ' not found')
             else
                res.status(200).json(course);
            
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
};

exports.getCourseByIdExtended = (req, res, next) => {
    const idCourse = req.params.idCourse;
    CourseRepository.getCourseByIdExtended(idCourse)
        .then(course => {
            if (!course)
                res.status(404).json('Course with id: ' + idCourse + ' not found')
             else
                res.status(200).json(course);
            
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
};


exports.createCourse = (req, res, next) => {
    CourseRepository.createCourse(req.body)
        .then(newObj => {
            res.status(201).json(newObj.id);
        })
        .catch(err => {
            if(err instanceof ValidationError)
                res.status(400).json(err.message);
                
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
};

exports.updateCourse = (req, res, next) => {
    const idCourse = req.params.idCourse;
    CourseRepository.updateCourse(idCourse, req.body)
        .then(result => {
            if (result == 0 || result.type == 'ValidationError')
                res.status(400).json({success: false});
            res.status(201).json({success: true});
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
};

exports.deleteCourse = (req, res, next) => {
    const idCourse = req.params.idCourse;
    CourseRepository.deleteCourse(idCourse)
        .then(result => {
            if(result == 0)
                res.status(404).json({
                    success: false,
                    message: 'Not found'
                });
            res.status(200).json({
                success: true,
                message: 'Course deleted!'
            });
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
};