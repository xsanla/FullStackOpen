import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortByLikes = (a,b) => {
        if (a.likes > b.likes){return -1}
        else if(a.likes < b.likes){return 1}
        return 0
      }
      setBlogs(blogs.sort(sortByLikes))
    }
    )
  }, [])

  useEffect(()=>{
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    }catch (exception) {
      setNotification(exception.message)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    
  }

  const handleCreateNew = async (newBlogData) => {

    try{
      const newBlog = {
        title: newBlogData.title,
        author: newBlogData.author,
        url: newBlogData.url
      }
      blogFormRef.current.toggleVisibility()
      await blogService.createNew(newBlog)
      setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    } catch (exception){
      setNotification(exception.message)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  
  const handleLogout = (event) =>{
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const like = (blog, likes, setLikes) => {
    const blogToUpdate = {
      _id: blog._id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1,
      _v: blog._v,
      user: blog.user.id
    }
    blogService.update(blogToUpdate)
    setLikes(likes + 1)
  }

  if (user === null) {
    return (
      <LoginForm handleLogin={handleLogin} notification={notification} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
    )
  }

  return (
    <>
    <div>
      <h2>blogs</h2>
      <Notification message={notification}/>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>log out</button>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} like={like} />
        )
      }
    </div>
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
          handleCreateNew={handleCreateNew}
        />
    </Togglable>
    </>
  )


}

export default App