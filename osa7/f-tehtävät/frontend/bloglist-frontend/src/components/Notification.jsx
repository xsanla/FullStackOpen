import { Alert } from "react-bootstrap"
import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification !== null) {
    return(
      <Alert variant="info">
        {notification}
      </Alert>
    )
    return (
      <div style={style}>
        {notification}
      </div>
    )
  } else {
    return
  }
}

export default Notification