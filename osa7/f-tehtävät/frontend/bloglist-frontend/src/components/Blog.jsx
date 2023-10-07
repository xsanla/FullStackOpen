import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { deleteBlog, likeAsync } from '../reducers/blogReducer'
const Blog = ({blog}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes)
  const [currentUsers, setCurrentUsers] = useState(false)
  const dispatch = useDispatch()
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  useEffect(() => {
    if (blog.user.username === JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username) {
      setCurrentUsers(true)
    }
  }, [])

  const likeAction = (blog) => {
      dispatch(likeAsync(blog._id))
      setLikes(likes +1)
      dispatch(setNotification(`you liked ${blog.title}`,5))
  }
  const removeBlog = (blog) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog._id))
      dispatch(setNotification(`you removed ${blog.title} by ${blog.author}`, 5))
    }
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>
          {showDetails ? 'hide' : 'view'}
        </button>

        {showDetails && (
          <div className='details'>
            <div>
              <strong>URL:</strong> {blog.url}
            </div>
            <div>
              <strong>Likes:</strong> {likes}
              <button id="likeButton" onClick={() => likeAction(blog)}>like</button>
            </div>
            <div>
              <strong>User:</strong> {blog.user.name}
            </div>
            {currentUsers && (
              <div>
                <button onClick={() => { removeBlog(blog) }}>remove</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
