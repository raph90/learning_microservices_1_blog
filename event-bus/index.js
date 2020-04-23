const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  // we don't know what's going to be in the body
  const event = req.body;

  events.push(event);

  axios.post("http://localhost:4000/events", event); // posts
  axios.post("http://localhost:5000/events", event); // comments
  axios.post("http://localhost:4003/events", event); // query service
  axios.post("http://localhost:4004/events", event); // moderation service

  res.send({ status: "OK " });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("EVENT BUS listening on 4005");
});
