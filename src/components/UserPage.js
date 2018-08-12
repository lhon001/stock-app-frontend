import React from 'react';
import { connect } from 'react-redux'

class UserPage extends React.Component {
  render(){
    // debugger
    // console.log(this.props);
    return (
      <div>
        <h1>{this.props.currentUser.name}'s Account</h1>

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
