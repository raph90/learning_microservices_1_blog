const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.send({});
});

const handleEvent = (type, data) => {
  let id;
  let content;
  let postId;
  let status;
  let post;

  switch (type) {
    case "PostCreated":
      const { title } = data;
      id = data.id; // the post id
      posts[id] = { id, title, comments: [] };
      break;
    case "CommentCreated":
      postId = data.postId;
      status = data.status;
      content = data.content;
      const commentId = data.id; // the comment id
      post = posts[postId];
      console.log("posts", posts);
      post.comments.push({ id: commentId, content, status });
      break;
    case "CommentUpdated":
      postId = data.postId;
      status = data.status;
      content = data.content;
      id = data.id;
      post = posts[postId];
      const comment = post.comments.find((comment) => {
        return comment.id === id;
      });
      comment.status = status;
      comment.content = content;
    default:
      return;
  }
};

app.listen(4003, async () => {
  console.log("Query service listening on 4003");

  const res = await axios.get("http://event-bus-srv:4005/events");
  for (let event of res.data) {
    console.log("processing event", event.type);
    handleEvent(event.type, event.data);
  }
});
