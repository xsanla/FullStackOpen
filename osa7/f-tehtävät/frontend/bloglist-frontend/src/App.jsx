import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Menu from "./components/Menu"
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser, logout } from "./reducers/userReducer";
import Home from "./components/Home";
import Users from "./components/Users";
import User from "./components/User";
import BlogPage from "./components/BlogPage";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const user = useSelector((state) => {
    return state.user;
  });
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
    <Router>
      <div className="container">
        <div>
          <Menu userName={user.username}></Menu>
          <div className="barAddons">
            <p>{user.username} logged in</p>
            <button
              className="logOut"
              id="logout"
              onClick={() => dispatch(logout())}
            >
              log out
            </button>
          </div>
          <h2>blogs</h2>
          <Notification />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="blogs/:id" element={<BlogPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
