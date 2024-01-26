const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use((req, res) => {
  res.status(404).send('Not Found');
});

// fs.writeFileSync("./text.txt", "hello tatti");

// fs.writeFile('./text.txt',"wsdfhsf", (err)=>{
//   console.log(err);
// })

// const file=fs.readFileSync('./text.txt', 'utf-8');
// console.log(file);

// fs.readFile('./text.txt', 'utf-8',(err, data)=>{
//   if(err){
//     console.log(err)
//   }else{
//     console.log(data)
//   }
// } )

// fs.appendFileSync("./text.txt",`${new Date().toString()} \n`);

// fs.copyFileSync('./text.txt', "./copyedfile")

// fs.copyFileSync('./Copy.txt', './Copy3.txt')

// fs.unlinkSync('./Copy.txt')

// app.get('/files', (req, res)=>{

// })

const todos = [
  {
    id: "34979384720482048284",
    title: "news",
    description: "breaking news ram mandir got constructed",
  },
  {
    id: "34979384720482345345",
    title: "study",
    description: "i have to study 8 hours a day",
  },
];

// fetching all todos
app.get("/todos", (req, res) => {
  if (todos.length === 0) {
    res.status(404).send("Not found");
  } else {
    res.status(200).json(todos);
  }
});

// getting a todo
app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((element) => element.id === id);

  if (index >= 0) {
    res.status(200).json(todos[index]);
  } else {
    res.status(404).send(" 404 Not Found");
  }
});

// creating a new todo
app.post("/todos", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const newid = uuidv4();

  todos.push({
    id: newid,
    title: title,
    description: description,
  });

  res.status(201).json({
    id: newid,
  });
});

// updating a todo
app.put("/todos/:id", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const id = req.params.id;


  const index = todos.findIndex((element) => element.id === id);

  if (index >= 0) {
    todos[index].title = title;
    todos[index].description = description;
    res.status(200).send("OK");
  } else {
    res.status(404).send("404 Not Found");
  }
});

// delete a todo
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((element) => element.id === id);

  if (index >= 0) {
    todos.splice(index,1);
    res.status(200).send("OK");
  } else {
    res.status(404).send(" 404 Not Found");
  }
});

app.listen(port, () => {
  console.log("listening at port 3000");
});
