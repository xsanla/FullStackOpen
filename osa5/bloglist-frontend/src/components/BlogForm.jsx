// BlogForm.js
import { useState } from 'react';
import PropTypes from 'prop-types'
const BlogForm = ({ handleCreateNew }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    handleCreateNew(newBlog);

    // Clear the form fields
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  handleCreateNew: PropTypes.func.isRequired
}
export default BlogForm;

