const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = new User({
      username: username,
      password: password,
    });
    user.save().then(
      res.status(200).json({
        message: "User created successfully",
      })
    );
  } catch {
    res.status(500).send("Internal server error");
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  try {
    const response = await Course.find({});
    res.status(200).json({
      courses: response,
    });
  } catch {
    res.status(500).send("Internal server error");
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const username = req.headers.username;
  const courseId = req.params.courseId;

  await User.updateOne(
    { username: username },
    { "$push": { purchasedCourses: courseId } }
  );

  res.status(200).json({
    message: "Course purchased successfully",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic

  const user = await User.findOne({
    username: req.headers.username,
  });

  console.log(user.purchasedCourses);
  const courses = await Course.find({
    _id: {
      "$in": user.purchasedCourses,
    },
  });

  res.json({
    courses: courses,
  });
});

module.exports = router;
