import React from 'react';
import { connect } from 'react-redux'
import { getUsersStocks, getPortfolios, getStockInfo, getPortfolioStocks  } from '../adapter'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import UserPortfolioTabs from './UserPortfolioTabs'
import PortfolioStocksInfo from './PortfolioStocksInfo'
import CreatePortfolio from './CreatePortfolio'
import CreatePortfolioForm from './CreatePortfolioForm'
import UserPageDisplay from './UserPageDisplay'

class UserPage extends React.Component {
  state = {
    stocks: [],
    portfolios: [],
    currentPortfolioID: null,
    createNewPortfolioState: false,
    value: 0
  }

  componentDidMount() {
    // console.log(this.props.portfolio);
    localStorage.getItem('currentUser', this.props.currentUser.id)

    getUsersStocks(this.props.currentUser)
    .then(stocks => {
      // map through each stock and make a fetch request to api(getStockInfo)
      // then setState with that new array
      if (stocks.length > 0){
      return (
        stocks.forEach((stock) => {
          getStockInfo(stock.symbol)
          .then(stockInfo => {
            // *****************************************************
            this.setState({...this.state,
              stocks: [...this.state.stocks, stockInfo]
            })
            // *****************************************************
          })
        })
      )}
    })

    getPortfolios(this.props.currentUser)
      .then(userPortfolios => {
        if (userPortfolios.length > 0){
        return (
          userPortfolios.forEach((singlePortfolio) => {
            this.setState({...this.state,
            portfolios: [...this.state.portfolios, singlePortfolio]})
          })
        )}
      })
  }

  render(){
    // console.log(this.state.stocks);
    return (
      <div>
        <h4>{this.props.currentUser.name}'s Account</h4>
        <CreatePortfolio />
        <UserPageDisplay displayState={this.state.display} currentStocks={this.state.stocks} />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userPageDisplay: () => dispatch({type: 'USER_PAGE_DISPLAY', payload: {UserPageDisplayState: 'CreatePortfolioForm'} })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
