import { likeAsync, commentBlog } from "../reducers/blogReducer";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import blogService from "../services/blogs"
const BlogPage = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const blog = useSelector((state) => {
    return [...state.blogs].filter((n) => n._id == id).at(0);
  });
  if (!blog) {
    return null;
  }
  const likeAction = () => {
    dispatch(likeAsync(blog._id));
    dispatch(setNotification(`you liked ${blog.title}`, 5));
  };
  const handleComment = (event) => {
    event.preventDefault()
    const comment = event.target.commentField.value
    dispatch(commentBlog(blog._id, comment))
    event.target.commentField.value = ""
  }
  const listItems = blog.comments.map((comment) => {
    return <li key={comment}>{comment}</li>;
  });
  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <strong>Likes:</strong> {blog.likes}
        <button id="likeButton" onClick={() => likeAction()}>
          like
        </button>
      </div>
      <p>added by {blog.user.username}</p>
      <div>
        <div>
            <form onSubmit={handleComment}>
                <input name="commentField" type="text"></input>
                <button type="submit">add comment</button>
            </form>
        </div>
        <div>
          <h3>comments</h3>
          <ul>{listItems}</ul>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
