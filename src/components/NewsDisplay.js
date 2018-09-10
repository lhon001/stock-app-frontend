import React from 'react'
import { connect } from 'react-redux'

class NewsDisplay extends React.Component {

  renderNews = () => {
    return(
      this.props.newsArray.map((news) => {
        console.log(news)
        return (
          <li key={news.url}><a href={news.url} target="_blank">{news.headline}</a></li>
        )
      })
    )
  }

  render(){
    return (
      <React.Fragment>
        <h5>News Articles</h5>
        <ul>
          {this.props.newsArray.length > 0 ? this.renderNews() : <li>No News Found</li>}
        </ul>
      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    stock: state.stock,
    newsArray: state.newsArray
  }
}

export default connect(mapStateToProps)(NewsDisplay)
