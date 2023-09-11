import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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

  const handleCreateNew = async (event) => {
    event.preventDefault()
    try{
      const newBlog = {
        title: title,
        author: author,
        url: url
      }
      await blogService.createNew(newBlog)
      setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setAuthor('')
      setTitle('')
      setUrl('')
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
  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        <Notification message={notification}/>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  if (user === null) {
    return (
      loginForm()
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
          <Blog key={blog.id} blog={blog} />
        )
      }
    </div>
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateNew}>
        <div>
          title 
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
    </>
  )


}

export default App