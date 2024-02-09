import { useSelector } from 'react-redux'

const ErrorMessage = () => {
    const errorMessage = useSelector(({ blogs, users, signUser, notification, errorMessage }) => {
        return errorMessage
      })

    if (errorMessage === null) {
        return null
    }

    return <div className="error_message">{errorMessage}</div>
}

export default ErrorMessage
