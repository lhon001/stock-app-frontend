import React from 'react'
import { connect } from 'react-redux'

class UserLogin extends React.Component{

  render(){
    return(
      <div>
        <button onClick={this.props.loginUser}>Login</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    loginUser: () => dispatch({type: 'LOGIN', payload: {loginState: true, content: "loginForm"}})
  }
}

export default connect(null, mapDispatchToProps)(UserLogin)
