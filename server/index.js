const express = require("express");
const parser = require("body-parser");

const app = express();

app.use(parser.json());

app.use(express.static("client/dist"));

// GET
app.get("/gamedata", (req, res) => {
  console.log("getting data");
  res.send({ hello: "world" });
});

// POST
app.post("/gamedata", (req, res) => {
  console.log("posting data");
  res.send(req.body);
});

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
