import React from 'react'
import { connect } from 'react-redux'
import { deleteStock, getPortfolioStocks, getStockInfo } from '../adapter'

class StockInfoRow extends React.Component {

  handleClick = (stock) => {
    deleteStock(stock.id)
    .then(resp => {
      getPortfolioStocks(this.props.currentID)
      .then(portfolioStocks => {
        console.log(portfolioStocks);
        this.props.stocksAfterDelete(portfolioStocks)
      })
    })
  }

  render(){
    console.log("this is inside render", this.props.currentStockInfo);
    return(
      <React.Fragment>
      {this.props.currentStockInfo.map(detailedStock => {
        // console.log(detailedStock);
        return (
          <tr key={detailedStock.id}>
            <td><button onClick={(e) => this.handleClick(detailedStock)}>X</button></td>
            <td>{detailedStock.companyName}</td>
            <td>{detailedStock.symbol}</td>
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
  console.log("inside mapStateToProps: ", state.currentStockInfo);
  return {
    currentPortfolioStocks: state.currentPortfolioStocks,
    currentID: state.currentPortfolioID,
    currentStockInfo: state.currentStockInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    stocksAfterDelete: (portfolioStocks) => dispatch({type: 'SET_CURRENT_PORTFOLIO_STOCKS', payload: {currentPortfolioStocks: portfolioStocks}}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockInfoRow)
