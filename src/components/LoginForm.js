import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username,password,setUsername,setPassword,handleLogin } ) => {
  return(
    <div>
      <h1>Login to Application </h1>
      <form>
        <div>
      Username <input type='text'
            id='username'
            value= {username}
            name ='Username'
            onChange = {({ target }) => setUsername(target.value)}>
          </input>
        </div>
        <div>
      Password   <input type='password'
            id='password'
            value= {password}
            name ='Password'
            onChange = {({ target }) => setPassword(target.value)}>
          </input>
        </div>
        <button id='submit' type='submit' onClick = { handleLogin }>Submit</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm