import React from 'react';
import { connect } from 'react-redux'
import { getUser } from '../adapter'

class UserHome extends React.Component {

  handleClick = () => {
    if (localStorage.getItem('currentUser')){
      getUser(localStorage.getItem('currentUser'))
      .then(userObj => this.props.refresh(userObj))
    }
  }

  render(){
    return (
      <div>
        <button className="btn-small waves-effect waves-light material-icons right" onClick={this.handleClick}>
          User Home
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    refresh: (currentUser) => dispatch({type: 'SHOW_USER_PAGE', payload: {currentUser: currentUser, content: 'userPage'}})
  }
}

export default connect(null, mapDispatchToProps)(UserHome)
