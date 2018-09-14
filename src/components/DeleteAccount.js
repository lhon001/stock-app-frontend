import React from 'react'
import { connect } from 'react-redux'
import { deleteUser } from '../adapter'
import AlertDialog from '../materializeUI/AlertDialog'

class DeleteAccount extends React.Component {

  handleClick = () => {
    return (
      console.log(this.props.currentUser, " account deleted")

    )
  }

  render(){
    return (
      <AlertDialog />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(DeleteAccount)
