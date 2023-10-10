import { useState, useEffect, useRef } from "react";
import BlogList from "./BlogList";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

const Home = () => {
  const blogFormRef = useRef();
  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <BlogList></BlogList>
    </div>
  );
};

export default Home;
