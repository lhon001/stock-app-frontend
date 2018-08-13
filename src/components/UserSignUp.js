import React from 'react'
import { connect } from 'react-redux'

class UserSignUp extends React.Component{

  render(){
    return(
      <div>
        <button className="btn-small waves-effect waves-light material-icons right" onClick={this.props.signUpUser}>Sign Up</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUpUser: () => dispatch({type: "SIGNUP", payload: {signUpState: true, content: "signUpForm"}})
  }
}

export default connect(null, mapDispatchToProps)(UserSignUp)
