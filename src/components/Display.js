import React from 'react'
import StockDisplay from './StockDisplay'
import UserSignUp from './UserSignUp'
import SignUpForm from './SignUpForm'
import UserPage from './UserPage'
import LoginForm from './LoginForm'
import { connect } from 'react-redux'

class Display extends React.Component{

  setContent = () => {
    switch (this.props.content){
      case 'stockInfo':
        return <StockDisplay />
      case 'signUpForm':
        return <SignUpForm />
      case 'loginForm':
        return <LoginForm />
      case 'userPage':
        return <UserPage />
      case 'invalid':
        return <h5>"{this.props.invalidSymbol}" is an invalid stock symbol, please try again</h5>
      default:
        return null
    }
  }

  render(){
    return (
      <div>
        {this.setContent()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    content: state.content,
    invalidSymbol: state.invalidSymbol
  }
}

export default connect(mapStateToProps)(Display)
