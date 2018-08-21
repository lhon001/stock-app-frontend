import React from 'react'
import { createPortfolio } from '../adapter'
import { connect } from 'react-redux'

class CreatePortfolio extends React.Component {
  state = {
    newPortfolioName: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.newPortfolioName);
    let newPortfolio = {name: this.state.newPortfolioName, user_id: this.props.currentUser.id}
    createPortfolio(newPortfolio)
    .then(createdPortfolio => console.log(createdPortfolio))
  }

  handleChange = (e) => {
    this.setState({
      newPortfolioName: e.target.value
    })
  }

  render(){
    return(
      // <button className="btn-small waves-effect waves-light material-icons left" onClick={this.handleClick}>Create New Portfolio</button>
      <form onSubmit={this.handleSubmit}>
        <input placeholder='Enter new portfolio name' type="text" onChange={(e) => this.handleChange(e)} value={this.state.text}></input>
        {/* <button className="btn-small waves-effect waves-light material-icons right" type="submit">Search</button> */}
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(CreatePortfolio)
