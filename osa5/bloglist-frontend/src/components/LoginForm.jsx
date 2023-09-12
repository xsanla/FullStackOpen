import Notification from './Notification'
const LoginForm = ({
    handleLogin,
    notification,
    username,
    password,
    setUsername,
    setPassword,
  }) => {
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
export default LoginForm