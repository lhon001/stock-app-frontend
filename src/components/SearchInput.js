import React from 'react';
import { connect } from 'react-redux'
import { getStockInfo } from '../adapter'

class SearchInput extends React.Component{
  state = {
    input: ''
  }

  // {status: 500, error: "Internal Server Error", exception: "#<RestClient::NotFound: 404 Not Found>", traces: {…}}

  handleSubmit = (e) => {
    e.preventDefault()

    getStockInfo(this.state.input)
      .then(resp => {
        if (resp.status === 500){
          this.props.invalidStock()
        } else {
          this.props.searchStock(resp)
        }
      })
      .then(() => {
        this.setState({
          input: ''
        })
      })
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
      invalidStock: () => dispatch({type: "INVALID_STOCK_SYMBOL", payload: {content: 'invalid'}})
    }
  }

export default connect(null, mapDispatchToProps)(SearchInput);
