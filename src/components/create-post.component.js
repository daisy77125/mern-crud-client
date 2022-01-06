import axios from "axios";
import { useState, useEffect } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const post = {
      title,
      content,
    };

    console.log(post);
    axios.post(`${apiUrl}/posts/add`, post).then((res) => {
      console.log(res.data);
      //window.location = "/";
    });

    setTitle("");
    setContent("");
  };

  return (
    <div>
      <h3>Create New Post</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title: </label>
          <input
            type="text"
            required
            className="form-control"
            value={title}
            onChange={onChangeTitle}
          />
        </div>
        <div className="form-group">
          <label>Content: </label>
          <textarea
            required
            className="form-control"
            value={content}
            onChange={onChangeContent}
          ></textarea>
        </div>

        <br />
        <div className="form-group">
          <input type="submit" value="Create" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
