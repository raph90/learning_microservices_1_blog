const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  // we don't know what's going to be in the body
  const event = req.body;

  axios.post("http://localhost:4000/events", event); // posts
  axios.post("http://localhost:5000/events", event); // comments
  axios.post("http://localhost:4002/events", event);

  res.send({ status: "OK " });
});

app.listen(4005, () => {
  console.log("listening on 4005");
});
