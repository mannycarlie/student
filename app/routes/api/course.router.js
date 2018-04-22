const Course = require('../../models/course.model');

module.exports = ((app, router, auth) => {
    router.route('/course')
        .get((req, res) => {
            Course.find()
                .exec((err, courses) => {
                    if (!err)
                        res.json(courses);
                })
        })
        .post(auth, (req, res) => {
            Course.create({
                courseid: req.body.courseid,
                name: req.body.name,
                created_by: req.user._id
            }, ((err, course) => {
                if (err)
                    res.send(err);
                else
                    res.json(course);
            }))
        })

    router.route('/course/:id')
        .get((req, res) => {
            Course.findOne({ _id: req.params.id })
                .select({ courseid: 1, name: 1 })
                .exec((err, course) => {
                    if (!err)
                        res.json(course);
                })
        })

        .put(auth, (req, res) => {
            Course.findOne({ _id: req.params.id })
                .exec((err, course) => {
                    if (course._id) {
                        course.courseid = req.body.courseid;
                        course.name = req.body.name;
                        course.update_by = req.user._id;
                        course.updated_at = new Date();
                        course.save(err => {
                            if (!err) {
                                res.json(course)
                            }
                        })
                    }
                })
        })

        .delete(auth, (req, res) => {
            Course.remove({_id: req.params.id})
            .exec(err=>{
                if(!err){
                    res.json({success: true})
                }
            })
        })

})