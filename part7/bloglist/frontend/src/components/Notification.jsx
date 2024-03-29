import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(({ blogs, users, signUser, notification, errorMessage }) => {
        return notification
      })
    
    if (notification === null) {
        return null
    }

    return <div className="notification">{notification}</div>
}

export default Notification
