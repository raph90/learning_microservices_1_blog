import React, { useState } from "react";
import Axios from "axios";

function CommentCreate({ postId }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await Axios.post(`http://localhost:5000/posts/${postId}/comments`, {
      content,
    });

    setContent("");
  };

  return (
    <div className="">
      <form action="" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default CommentCreate;
