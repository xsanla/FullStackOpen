import { useState, useEffect } from "react";
import userService from "../services/users";
import { useParams } from "react-router-dom";
const User = () => {
  const [data, setData] = useState({blogs:[]});
  const id = useParams().id
  useEffect(() => {
    userService
      .get(id)
      .then((response) => {
        setData(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const listItems = data.blogs.map((blog) => {
    return <li key={blog._id}>{blog.title}</li>;
  });
  return (
    <div>
      <h2>{data.username}</h2>
      <h3>added blogs</h3>
      <ul>{listItems}</ul>
    </div>
  );
};

export default User