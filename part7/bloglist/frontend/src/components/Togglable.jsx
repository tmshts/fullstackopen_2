import { useImperativeHandle, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

const HandleButton = styled.button`
    color: #BF4F74;
    font-size: 1em;
    margin: 0.5em 0 0.5em 0;
    border: 2px solid #BF4F74;
    border-radius: 10px;
`

const Togglable = forwardRef((props, refs) => {
    const [blogFormVisible, setBlogFormVisible] = useState(false)

    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    const toggleVisibility = () => {
        setBlogFormVisible(!blogFormVisible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility,
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <HandleButton onClick={toggleVisibility}>{props.buttonLabel}</HandleButton>
            </div>

            <div style={showWhenVisible}>
                <h4>Create new blog</h4>
                {props.children}
                <HandleButton onClick={toggleVisibility}>cancel</HandleButton>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
