import React from 'react';
import { connect } from 'react-redux'
import { getStockInfo, stockSymbolArray, getStockNews } from '../adapter'

class SearchInput extends React.Component{

  state = {
    input: ''
  }

  componentDidMount(){
    // let symbols = []
    // stockSymbolArray()
    // .then(array => {
    //   array.forEach((stock) => {
    //     symbols.push(stock.symbol)
    //     console.log(symbols);
    //   })
    // })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.state.input !== ''){
      getStockInfo(this.state.input)
      .then(resp => {
        if (resp.status === 500){
          this.props.invalidInput(this.state.input)
          this.props.invalidStock()
        } else {
          this.props.searchStock(resp)
        }
      })
      .then(() => {
        getStockNews(this.state.input)
        .then(news => {
          console.log(news);
          this.props.loadStockNews(news)
        })
      })
      .then(() => {
        this.setState({
          input: ''
        })
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    }, () => {
      console.log(this.state.input);
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input placeholder='Enter Stock Symbol (e.g. tsla)' type="text" onChange={(e) => this.handleChange(e)} value={this.state.input}></input>
          {/* <button className="btn-small waves-effect waves-light material-icons right" type="submit">Search</button> */}
        </form>
      </div>
    )
  }
}
  const mapDispatchToProps = (dispatch) => {
    return {
      searchStock: (stockObj) => dispatch({type: "SAVE_SEARCHED_STOCK", payload: {stockObj: stockObj, content: 'stockInfo'}}),
      invalidStock: () => dispatch({type: "INVALID_STOCK_SYMBOL", payload: {content: 'invalid'}}),
      loadStockNews: (news) => dispatch({type: "LOAD_NEWS", payload: {newsArray: news}}),
      invalidInput: (input) => dispatch({type: "INVALID_SYMBOL", payload: {invalidSymbol: input}})
    }
  }

export default connect(null, mapDispatchToProps)(SearchInput);
