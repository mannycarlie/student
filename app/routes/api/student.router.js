const Student = require('../../models/student.model');

module.exports = ((app, router, auth) => {
    router.route('/student')
        .get((req, res) => {
            Student.find()
                .populate({ path: "course", select: { name: 1 } })
                .exec((err, students) => {
                    if (!err)
                        res.json(students);
                })
        })
        .post(auth, (req, res) => {
            Student.create({
                studentid: req.body.studentid,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                course: req.body.course,
                year: req.body.year,
                created_by: req.user._id
            }, ((err, student) => {
                if (err)
                    res.send(err);
                else
                    res.json(student);
            }))
        })

    router.route('/student/:id')
        .get((req, res) => {
            Student.findOne({ _id: req.params.id })
                .exec((err, student) => {
                    if (!err)
                        res.json(student);
                })
        })

        .put(auth, (req, res) => {
            Student.findOne({ _id: req.params.id })
                .exec((err, student) => {
                    if (student._id) {
                        student.studentid = req.body.studentid;
                        student.first_name = req.body.first_name;
                        student.last_name = req.body.last_name;
                        student.course = req.body.course;
                        student.year = req.body.year;
                        student.update_by = req.user._id;
                        student.updated_at = new Date();
                        student.save(err => {
                            if (!err) {
                                res.json(student)
                            }
                        })
                    }
                })
        })

        .delete(auth, (req, res) => {
            Student.remove({ _id: req.params.id })
                .exec(err => {
                    if (!err) {
                        res.json({ success: true })
                    }
                })
        })
})