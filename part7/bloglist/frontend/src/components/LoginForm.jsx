import PropTypes from 'prop-types'

import styled from 'styled-components'

const Input = styled.input`
    padding: grey;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 15px;
    margin: 0.5em 0 0 0.2em;
    &:focus {
        outline: none;
        box-shadow: 0px 0px 5px #BF4F74;
    }
`

const LoginButton = styled.button`
    color: #BF4F74;
    font-size: 1em;
    margin-top: 10px;
    padding: 0.25em 0.5em;
    border: 2px solid #BF4F74;
    border-radius: 10px;
    &:focus {
        outline: none
    }
`



const LoginForm = (props) => (
    <div className='parent_login' >
        <form onSubmit={props.handleSubmit}>

                <div >
                    <Input
                        type="text"
                        value={props.username}
                        id="username"
                        name="Username"
                        onChange={props.handleUsernameChange}
                        placeholder='Username'  
                    />
                </div>
                
                <div >
                    <Input
                        type="password"
                        value={props.password}
                        id="password"
                        name="Password"
                        onChange={props.handlePasswordChange}
                        placeholder='Password'
                    />
                </div>


                <div>

                    <div className='parent_login_login'>
                        <LoginButton id="login_btn" type="submit">
                            login
                        </LoginButton>
                    </div>

                </div>



        </form>
    </div>

)

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
}

export default LoginForm
