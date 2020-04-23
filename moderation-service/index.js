const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("Moderation received", type);
  let status;
  switch (type) {
    case "CommentCreated":
      status = data.content.includes("orange") ? "rejected" : "approved";
      await axios.post("http://event-bus-srv:4005/events", {
        type: "CommentModerated",
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content,
        },
      });
      break;
    default:
      res.status(201);
      return;
  }
  res.send({});
});

app.listen(4004, () => {
  console.log("MODERATION - listening on 4004!");
});
