import React, { useEffect, useState } from "react";
import Axios from "axios";

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    const res = await Axios.get(
      `http://localhost:5000/posts/${postId}/comments`
    );
    setComments(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });
  return <ul>{renderedComments}</ul>;
}

export default CommentList;
