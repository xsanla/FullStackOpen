const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const userExtractor = require("../utils/userExtractor");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;

  const user = await User.findById(request.user);
  if (body.likes === undefined) {
    body.likes = 0;
  }
  if (body.title === undefined || body.url === undefined) {
    response.status(400).send();
    return;
  }

  const blog = new Blog({
    _id: body._id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
    comments: [],
    __v: body.__v,
  });
  const posted = await blog.save();
  user.blogs = user.blogs.concat(posted._id);
  await user.save();
  response.status(201).json(posted);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const blogToRemove = await Blog.findById(request.params.id);
  const user = await User.findById(request.user)
  if(blogToRemove === null){
    return response.status(404).send()
  }
  if (blogToRemove.user._id.toString() !== request.user.toString()) {
    return response
      .status(403)
      .json({
        error: "the blog to deleted wasn't created by the current user",
      });
  }
  await Blog.findByIdAndRemove(request.params.id);
  user.blogs = user.blogs.filter((n) => n.toString() !== request.params.id)
  await user.save()
  response.status(200).send();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    _id: body._id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    __v: body.__v,
    user: body.user,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const body = request.body;
  const comment = body.comment
  const id = request.params.id
  const blog = await Blog.findById(id)
  blog.comments = blog.comments.concat(comment)
  await blog.save()
  response.status(200).send()
})
module.exports = blogsRouter;
