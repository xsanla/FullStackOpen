import{ useState, useEffect } from 'react';
import blogService from '../services/blogs'
const Blog = ({ blog, like }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes)
  const [currentUsers, setCurrentUsers] = useState(false)
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  useEffect(() => {
    if(blog.user.username === JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username){
      setCurrentUsers(true)
    }
  }, [])

  const removeBlog = (blog) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      blogService.deleteBlog(blog._id)
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
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails && (
        <div className='details'>
          <div>
            <strong>URL:</strong> {blog.url}
          </div>
          <div>
            <strong>Likes:</strong> {likes}
            <button onClick={() => like(blog, likes, setLikes)}>like</button>
          </div>
          <div>
            <strong>User:</strong> {blog.user.name}
          </div>
          {currentUsers && (
          <div>
            <button onClick={()=>{removeBlog(blog)}}>remove</button>
          </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
