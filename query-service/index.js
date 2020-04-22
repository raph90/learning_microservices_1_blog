const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log("received event!", type);
  let id;
  switch (type) {
    case "PostCreated":
      const { title } = data;
      id = data.id; // the post id
      posts[id] = { id, title, comments: [] };
      break;
    case "CommentCreated":
      const { content, postId } = data;
      const commentId = data.id; // the comment id
      const post = posts[postId];
      console.log("posts", posts);
      post.comments.push({ id: commentId, content });
      break;
    default:
      res.send({});
      return;
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Query service listening on 4003");
});
