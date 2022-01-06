import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Post = ({ post, deletePost }) => (
  <div className="my-box-1">
    <h1 className="display-6">{post.title}</h1>
    <p className="lead">{post.content}</p>

    <Link to={"/edit/" + post._id}>
      <button type="button" className="btn btn-primary">
        edit
      </button>
    </Link>
    <button
      style={{ marginLeft: "10px" }}
      type="button"
      className="btn btn-danger"
      onClick={() => {
        deletePost(post._id);
      }}
    >
      delete
    </button>
  </div>
);

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts/")
      .then((response) => {
        setPosts(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deletePost = (id) => {
    axios
      .delete("http://localhost:5000/posts/" + id)
      .then((res) => {
        // console.log(res.data);
        setPosts(posts.filter((el) => el._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} deletePost={deletePost} />
      ))}
    </div>
  );
};

export default PostsList;
