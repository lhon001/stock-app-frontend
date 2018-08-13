import React from 'react';
import { connect } from 'react-redux'

class UserPage extends React.Component {
  render(){
    // console.log(this.props.currentUser);
    return (
      <div>
        <h5>{this.props.currentUser.name}'s Account</h5>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(UserPage)
