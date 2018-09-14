import React from 'react'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'

class UserSignUp extends React.Component{

  render(){
    return(
      <div>
        {/* <button className="btn-small waves-effect waves-light material-icons right" onClick={this.props.signUpUser}>Sign Up</button> */}
        <Button onClick={this.props.signUpUser}>Sign Up</Button>
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
