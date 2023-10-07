import Notification from './Notification'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
const LoginForm = ({
    username,
    password,
    setUsername,
    setPassword,
  }) => {
    const dispatch = useDispatch()
    const handleLogin = (event) =>{
      event.preventDefault()
      dispatch(login({username:username, password:password}))
      setUsername("")
      setPassword("")
    }
    return (
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        <Notification/>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="loginButton" type="submit">login</button>
      </form>
    )
  }
export default LoginForm