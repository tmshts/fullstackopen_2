import PropTypes from 'prop-types'

const LoginForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <div>
        username
      <input
        type="text"
        value={props.username}
        id='username'
        name="Username"
        onChange={props.handleUsernameChange}
      />
    </div>
    <div>
        password
      <input
        type="password"
        value={props.password}
        id='password'
        name="Password"
        onChange={props.handlePasswordChange}
      />
    </div>
    <button id='login_btn' type="submit">login</button>
  </form>
)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm