import React from 'react'
import { connect } from 'react-redux'

class UserLogout extends React.Component{

  handleClick = () => {
    // console.log("loggin out");
    this.props.logoutUser()
    localStorage.removeItem('currentUser')
    this.props.resetStockInfoRow()
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
    logoutUser: () => dispatch({type: 'LOGOUT', payload: {loginState: false, currentUser: null}}),
    resetStockInfoRow: () => dispatch({type: "RESET_STOCK_INFO_ROW", payload: {currentPortfolioID: null}})
  }
}

export default connect(null, mapDispatchToProps)(UserLogout)
