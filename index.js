const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const users = [
  {
    name: "John",
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: false,
      },
    ],
  },
  // {
  //   name: "Roopam",
  //   kidneys: [
  //     {
  //       healthy: true,
  //     },
  //     {
  //       healthy: true,
  //     },
  //   ],
  // },
];

// get request
app.get("/", (req, res) => {
  const John = users[0];
  const No_ofKidneys = John.kidneys.length;

  const healthy = John.kidneys.filter((element) => {
    return element.healthy == true;
  });
  const healthykidneys = healthy.length;
  const unhealthyKidneys = No_ofKidneys - healthykidneys;

  res.json({
    No_ofKidneys,
    healthykidneys,
    unhealthyKidneys,
  });
});

// post request
app.post("/add", (req, res) => {
  const ishealthy = req.body.healthy;
  users[0].kidneys.push({ healthy: ishealthy });
  res.send({
    message: "added",
  });
});

// put request
app.put("/update", (req, res) => {
  const ishealthy = req.body.healthy;

  function ispresent() {
    users[0].kidneys.some((element) => {
      return element.healthy !== ishealthy;
    });
  }

  if (ispresent()) {
    users[0].kidneys.forEach((element) => {
      element.healthy = ishealthy;
    });
    res.send({
      message: "updated",
    });
  } else {
    res.status(411).send({
      message: "No this kidney present to update",
    });
  }
});

// Delete a kidney
app.delete("/delete", (req, res) => {
  // const ishealthy = req.body.healthy;

  function badkidneypresent() {
    return users[0].kidneys.some((element) => {
      return element.healthy === false;
    });
  }

  if (badkidneypresent()) {
    users[0].kidneys = users[0].kidneys.filter((element) => {
      return element.healthy !== false;
    });

    res.send({
      message: "deleted",
    });
  } else {
    res.status(411).send({
      message: `no bad kidneys`,
    });
  }
});

app.listen(port, () => {
  console.log(`listening at ${port}`);
});
