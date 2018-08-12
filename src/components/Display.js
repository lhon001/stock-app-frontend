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
    content: state.content
  }
}

export default connect(mapStateToProps)(Display)
