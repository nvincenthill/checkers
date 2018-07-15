const express = require("express");
const parser = require("body-parser");

const app = express();

app.use(parser.json());

app.use(express.static("client/dist"));

// GET
app.get("/gameadata", (req, res) => res.send("Hello World!"));

// POST
app.post("/gameadata", (req, res) => res.send(req.body));

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
