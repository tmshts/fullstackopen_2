import { useImperativeHandle, useState, forwardRef } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' } 

  const toggleVisibility = () => {
    setBlogFormVisible(!blogFormVisible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

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
})

export default Togglable