const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course, jwtPassword } = require("../db");
const jwt = require("jsonwebtoken");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  await User.create({
    username: username,
    password: password,
  });
  res.status(200).json({ message: "User created successfully" });
});

router.post("/signin", (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const token = jwt.sign(
    { username: username, password: password },
    jwtPassword
  );

  res.status(200).json({ token: token });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const list = await Course.find({});
  res.status(200).json({
    courses: list,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.split(" ")[0] === "Bearer") {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, jwtPassword);

      await User.updateOne(
        { username: decoded.username },
        { "$push": { purchasedCourses: courseId } }
      );
      res.status(200).json({
        message: "Course purchased successfully",
      });
    } catch(error) {
        console.log(error)
      res.status(401).json({
        message: "Invalid token",
      });
    }
  } else {
    res.status(401).json({
      message: "Authentication header is missing or invalid",
    });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.split(" ")[0] === "Bearer") {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, jwtPassword);
      const user = await User.findOne({ username: decoded.username });

      const course = await Course.find({
        _id: {
          "$in": user.purchasedCourses,
        },
      });
      res.status(200).json({
        purchasedCourses: course,
      });
    } catch {
      res.status(401).json({
        message: "Invalid token",
      });
    }
  } else {
    res.status(401).json({
      message: "Authentication header is missing or invalid",
    });
  }
});

module.exports = router;
