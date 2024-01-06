import { useSelector } from 'react-redux'


const Notification = () => {
  const notification = useSelector(({ notification }) => {
    return notification
  })

  const style = {
    border: 'solid green',
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
  }

  if ( notification === null ) {
    return null
  }
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification