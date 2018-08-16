import React from 'react';
import { connect } from 'react-redux'
import { getUsersStocks, getPortfolios  } from '../adapter'

class UserPage extends React.Component {
  state = {
    stocks: ''
  }

  componentDidMount() {
    // console.log(this.props.portfolio);
    localStorage.getItem('currentUser', this.props.currentUser.id)
    getUsersStocks(this.props.currentUser)
    .then(stocks => {
      this.setState({
        stocks: stocks
      })
    })
  }

  // getUsersStocks(this.props.currentUser)
  //   .then(stocks => stocks.map(stock => <h4>{stock.companyName}</h4>))
  //   console.log("beef");

  renderStocks = () => {
    // console.log(this.state.stocks);
    return (
      this.state.stocks.map(stock => {
        return (
            <h6 key={stock.id}>{stock.companyName}</h6>
        )
      })
    )
  }

  // renderPortfolios = () => {
  //   return (
  //     this.state.p
  //   )
  // }

  render(){
    // console.log(this.props.currentUser);
    return (
      <div>
        <h4>{this.props.currentUser.name}'s Account</h4>
        {this.state.stocks ? this.renderStocks() : null}
        {/* {this.state.stocks ? this.renderPortfolios() : null} */}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    portfolio: state.portfolio
  }
}

export default connect(mapStateToProps)(UserPage)
