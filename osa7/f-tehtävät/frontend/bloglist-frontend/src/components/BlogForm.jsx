import { setNotification } from '../reducers/notificationReducer';
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import { createNew } from '../reducers/blogReducer';
const BlogForm = () => {
  const dispatch = useDispatch()
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value
    const author = event.target.author.value 
    const url = event.target.url.value
    const newBlog = {
      title,
      author,
      url,
    };
    try{
      dispatch(createNew(newBlog))
      dispatch(setNotification(`added ${newBlog.title} by ${newBlog.author}`,5))
    } catch (exception){
      dispatch(setNotification(exception,5))
    }
    
    event.target.title.value=""
    event.target.author.value="" 
    event.target.url.value=""
  };

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input
            className="title"
            name="title"
            type="text"
          />
        </div>
        <div>
          Author:
          <input
            className="author"
            name="author"
            type="text"
          />
        </div>
        <div>
          URL:
          <input
            className='url'
            name="url"
            type="text"
          />
        </div>
        <button className="createButton" type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;

