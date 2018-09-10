import React from 'react'
import { connect } from 'react-redux'
import { deleteStock, getPortfolioStocks, getStockInfo } from '../adapter'

class StockInfoRow extends React.Component {

  handleClick = (stock) => {
    // console.log("before delete: ", this.props.currentPortfolioStocks);
    deleteStock(stock.id)
    .then(resp => {
      getPortfolioStocks(this.props.currentID)
      .then(portfolioStocks => {
        this.props.stocksAfterDelete(portfolioStocks)
        // console.log("after delete: ", this.props.currentPortfolioStocks);
        this.props.deleteStockInfo(stock.id)
      })
    })
  }

  showStockPage = (stock) => {
    this.props.searchStock(stock)
  }

  render(){
    return(
      <React.Fragment>
      {this.props.currentStockInfo.map(detailedStock => {
        return (
          <tr key={detailedStock.id}>
            <td><button onClick={(e) => this.handleClick(detailedStock)}>X</button></td>
            <td><a href={detailedStock.website} target="_blank">{detailedStock.companyName}</a></td>
            <td><a onClick={(e) => this.showStockPage(detailedStock)}>{detailedStock.symbol}</a></td>
            <td>{detailedStock.price}</td>
            <td>{detailedStock.marketcap}</td>
            <td>{detailedStock.week52high}</td>
            <td>{detailedStock.week52low}</td>
            <td>{detailedStock.priceToBook}</td>
            <td>{detailedStock.priceToSales}</td>
            <td>{detailedStock.latestEPS}</td>
            <td>{detailedStock.beta}</td>
            <td>{detailedStock.returnOnEquity}</td>
            <td>{detailedStock.peRatio}</td>
          </tr>
        )
      })}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentPortfolioStocks: state.currentPortfolioStocks,
    currentID: state.currentPortfolioID,
    currentStockInfo: state.currentStockInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    stocksAfterDelete: (portfolioStocks) => dispatch({type: 'SET_CURRENT_PORTFOLIO_STOCKS', payload: {currentPortfolioStocks: portfolioStocks}}),
    deleteStockInfo: (stockID) => dispatch({type: "DELETE_STOCK_INFO", payload: {stockID: stockID}}),
    searchStock: (stockObj) => dispatch({type: "SAVE_SEARCHED_STOCK", payload: {stockObj: stockObj, content: 'stockInfo'}})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockInfoRow)
