import { useState } from 'react'

const Togglable = (props) => {
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' } 

  const toggleVisibility = () => {
    setBlogFormVisible(!blogFormVisible)
  }

  return (
    <div>
        <div style={hideWhenVisible}>
            <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>

        <div style={showWhenVisible}>
            <h3>create new</h3>
            {props.children}
            <button onClick={toggleVisibility}>cancel</button>
        </div>
    </div>
  )
}

export default Togglable