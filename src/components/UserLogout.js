import React from 'react'
import { connect } from 'react-redux'

class UserLogout extends React.Component{

  handleClick = () => {
    console.log("loggin out");
    this.props.logoutUser()
    localStorage.removeItem('currentUser')
  }

  render(){
    return(
      <div>
        <button className="btn-small waves-effect waves-light material-icons right" onClick={this.handleClick}>Logout</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    logoutUser: () => dispatch({type: 'LOGOUT', payload: {loginState: false, currentUser: null}})
  }
}

export default connect(null, mapDispatchToProps)(UserLogout)
