import React from 'react'
import { connect } from 'react-redux'

class NewsDisplay extends React.Component {

  renderNews = () => {
    return(
      this.props.newsArray.map((news) => {
        return (
          <li><a href={news.url} target="_blank">{news.headline}</a></li>
        )
      })
    )
  }

  render(){
    return (
      <React.Fragment>
        <h4>News Articles</h4>
        <ul>
          {this.renderNews()}
        </ul>
      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    newsArray: state.newsArray
  }
}

export default connect(mapStateToProps)(NewsDisplay)
