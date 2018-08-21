import React from 'react'
import { connect } from 'react-redux'
import UserPortfolioTabs from './UserPortfolioTabs'
import PortfolioStocksInfo from './PortfolioStocksInfo'
import { getPortfolioStocks, getPortfolios, getStockInfo } from '../adapter'

class UserPageDisplay extends React.Component {
  state = {
    currentPortfolioID: null,
    currentPortfolioStocks: null,
    stockInfoArray: []
  }

  handleTabSelect = (portfolioID) => {
    this.setState({
      currentPortfolioID: portfolioID
    })

    getPortfolioStocks(portfolioID) // why does this.state.currentPortfolioID vs portfolioID not work
    .then(stocks => {
      this.setState({currentPortfolioStocks: stocks})
    })
    .then(() => {
      let tempArray = []
      this.state.currentPortfolioStocks.forEach((stock) => {
        console.log(stock);
        getStockInfo(stock.symbol)
        .then(stockInfo => {
          // debugger
          tempArray.push({...stockInfo, id:stock.id}) // stockInfo["id"] = stock.id
        })
        .then(() => {
          this.setState({
            stockInfoArray: tempArray
          }, () => {
            console.log("current stockInfoArray: ", this.state.stockInfoArray);
          })
        })
      })
    })

  }

  render(){
    return(
      <React.Fragment>
        <UserPortfolioTabs currentUser={this.props.currentUser} handleTabSelect={this.handleTabSelect}/>
        {this.state.stockInfoArray.length > 0 ? <PortfolioStocksInfo stockInfoArray={this.state.stockInfoArray}/> : null}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(UserPageDisplay)
