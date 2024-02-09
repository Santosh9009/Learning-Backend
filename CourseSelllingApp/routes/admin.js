const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin, Course,jwtPassword} = require('../db');
const jwt= require('jsonwebtoken')

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;


    await Admin.create({
        username: username,
        password: password
    }) 

    res.status(200).json({ message: 'Admin created successfully' })

});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const token = jwt.sign({username: username, password: password},jwtPassword);

    res.status(200).json({ token: token })
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const course = await Course.create({
        title : title,
        description : description,
        price : price,
        imageLink : imageLink
    })

    res.status(200).json({ message: 'Course created successfully', courseId: course._id })
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const list = await Course.find({});
    res.status(200).json({
        courses: list
    })
});

module.exports = router;