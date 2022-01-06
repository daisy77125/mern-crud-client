import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${apiUrl}/posts/` + id)
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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

    axios
      .post(`${apiUrl}/posts/update/` + id, post)
      .then((res) => console.log(res.data));

    window.location = "/";
  };

  return (
    <div>
      <h3>Update Post</h3>
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
          <input
            type="submit"
            value="Save Changes"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditPost;
