import React from 'react';
import { connect } from 'react-redux'
import { getStockInfo } from '../adapter'

class SearchInput extends React.Component{
  state = {
    text: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    getStockInfo(this.state.text)
      .then(data => this.props.searchStock(data))
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={(e) => this.handleChange(e)} value={this.state.text}></input>
          <button type="submit">Search</button>
        </form>
      </div>
    )
  }
}
  const mapDispatchToProps = (dispatch) => {
    return {
      searchStock: (stockObj) => dispatch({type: "SAVE_SEARCHED_STOCK", payload: {stockObj: stockObj, content: 'stockInfo'}})
    }
  }

export default connect(null, mapDispatchToProps)(SearchInput);
