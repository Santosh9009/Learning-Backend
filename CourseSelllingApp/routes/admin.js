const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, User, Course } = require('./models');


// Admin Routes
router.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
        const admin = new Admin({
            username : username,
            password : password
        })
        admin.save();
        res.status(200).send("Admin created successfully")
    }catch{
        res.status(500).send("Internal server error")
    }
});

router.post('/courses', adminMiddleware, (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    try{
        const course = new Course({
            title : title,
            description : description,
            price : price,
            imageLink : imageLink
        })
        course.save();
        res.status(200).send(course._id)
    }catch{
        res.status(500).send("Internal server error")
    }

});

router.get('/courses', adminMiddleware, (req, res) => {
    try{
        const array = Course.find({});
        res.status(200).send(array);
    }catch{
        res.status(500).send("Internal server error");
    }
});

module.exports = router;