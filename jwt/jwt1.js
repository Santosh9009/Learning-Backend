const express = require("express");
const app = express();
const port = 3000;
const jwt = require("jsonwebtoken");
const jwtpassword = "what123";

// const z = require("zod");

// function validateinput(arr) {
//   const schema = z.object({
//     email: z.string().email(),
//     password: z.string().min(5),
//   });

//   const result = schema.safeParse(arr);
//   if (result.success) {
//     console.log(arr, "yay!");
//   } else {
//     console.log( result);
//   }
// }

// validateinput({email:"patianil00@gmail.com",password: "233"});
const user = [
  {
    username: "patianil",
    password: "121",
    name: "patianil",
  },
  {
    username: "hkirat",
    password: "233",
    name: "hkirat",
  },
  {
    username: "santosh",
    password: "32454",
    name: "santoshpati",
  },
];

app.use(express.json());

function exist(username, password) {
  const check = user.find(
    (user) => user.username === username && user.password === password,
  );

  return check;
}

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!exist(username, password)) {
    res.status(401).json({ message: "invalid credentials" });
  } else {
    const token = jwt.sign({ username: username }, jwtpassword);
    res.json({ token });
  }
});

app.get("/user", (req, res) => {
  const token = req.headers.auth;
  try {
    const decoded = jwt.verify(token, jwtpassword);
    const username = decoded.username;
    const list = user.filter((element) => element.username !== username);
    res.json(list);
  } catch (err) {
    res.status(401).json({ message: "invalid token" });
  }
});

app.listen(port, () => {
  console.log("listening at port 3000");
});
