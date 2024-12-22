import express from "express";

const app = express();
const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello form Shiwam!");
// });
// app.get("/ice-tea", (req, res) => {
//   res.send("What ice tea would you prefer");
// });
// app.get("/twitter", (req, res) => {
//   res.send("Hello form Shiwam Twitter!");
// });
app.use(express.json());

let teaData = [];
let nextId = 1;

//add a new tea
app.post("/teas", (req, res) => {
  //   req.body.price;
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

//get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

//get a tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("tea not found");
  }
  res.status(200).send(tea);
});

//update tea //bussiness logic
app.put("/teas/:id", (req, res) => {
  const teaId = req.params.id;
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.send(200).send(tea);
});

//delete tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("not found");
  }
  teaData.splice(index, 1);
  return res.status(204).send("deleted");
});
app.listen(port, () => {
  console.log(`sever is running at port: ${port}...`);
});
