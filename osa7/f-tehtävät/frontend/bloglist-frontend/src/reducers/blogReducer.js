import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((n) => n._id !== id);
    },
    like(state, action) {
      const id = action.payload;
      const toChange = state.find((n) => n._id === id);
      const changed = {
        ...toChange,
        likes: toChange.likes + 1,
      };
      return state.map((a) => (a._id !== id ? a : changed));
    },
    comment(state, action) {
      const payload = action.payload;
      const id = payload.id.id;
      const comment = payload.comment.commentText;
      const toChange = state.find((n) => n._id === id);
      const changed = {
        ...toChange,
        comments: toChange.comments.concat(comment),
      };
      return state.map((a) => (a._id !== id ? a : changed));
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { like, setBlogs, appendBlog, comment } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(deleteBlog(id));
  };
};
export const createNew = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.createNew(content);
    dispatch(appendBlog(newBlog));
  };
};

export const likeAsync = (id) => {
  return async (dispatch) => {
    const toUpdate = await blogService.update(id);
    dispatch(like(id));
  };
};

export const commentBlog = (id, commentText) => {
  return async (dispatch) => {
    const toComment = await blogService.comment(id, commentText);
    dispatch(comment({ id: { id }, comment: { commentText } }));
  };
};
export default blogSlice.reducer;
