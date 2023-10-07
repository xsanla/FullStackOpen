import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser, logout } from "./reducers/userReducer";
import BlogList from "./components/BlogList";
const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const user = useSelector((state) => {
    return state.user
  })
  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  if (user === null) {
    return (
      <LoginForm
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    );
  }

  return (
    <>
      <div>
        <h2>blogs</h2>
        <Notification />
        <p>{user.name} logged in</p>
        <button id="logout" onClick={() => dispatch(logout())}>
          log out
        </button>
        <BlogList></BlogList>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
    </>
  );
};

export default App;
