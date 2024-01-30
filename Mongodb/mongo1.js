const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const url =
  "mongodb+srv://Santosh:Santosh%4063711@cluster0.cmycynz.mongodb.net/newapp";

const user = mongoose.model("user", {
  name: String,
  email: String,
  password: String,
});

mongoose.connect(url);

app.post("/user", async (req, res) => {
  const name = req.body.name;
  const username = req.body.email;
  const password = req.body.password;

  try {
    // Use await since findOne is asynchronous
    const check = await user.findOne({ email: username });

    if (check) {
      res.send("Username already exists");
    } else {
      const newUser = new user({
        name: name,
        email: username,
        password: password,
      });
      await newUser.save(); // Make sure to await save() as well
      res.send("User added successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port,()=>{
  console.log("listening at port 3000")
});