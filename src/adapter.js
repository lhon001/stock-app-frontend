// const baseURL = `http://localhost:3000/api/v1`
const baseURL = `https://stock-app-backend.herokuapp.com/api/v1`


export function deleteUser(user) {
  const url = `${baseURL}/users/${user.id}`
  const options = {
    method: "DELETE",
    headers: {'Content-Type': 'application/json'}
  }

  return fetch(url, options)
  .then(r => r.json())
}

export function getStockInfo(symbol) {
  const url = `${baseURL}/search/${symbol}`

  return fetch(url)
    .then(r => {
      if (r.status === 500){
        return r
      }
      else {
        return r.json()
      }
    })
}

export function getStockNews(symbol) {
  const url = `${baseURL}/get_news/${symbol}`

  return fetch(url)
  .then(r => {
    if (r.status !== 200){
      return r
    }
    else {
      return r.json()
    }
  })
}

export function stockSymbolArray() {
  const url = `${baseURL}/search`

  return fetch(url)
    .then(r => r.json())
}

export function createUser(userObj) {
  const url = `${baseURL}/users`
  const options = {
    method: "POST",
    headers: {"Content-Type": 'application/json'},
    body: JSON.stringify({user: userObj})
  }

  return fetch(url, options)
    .then(r => r.json())
}

export function loginUser(userObj) {
  const url = `${baseURL}/login`
  const options = {
    method: "POST",
    headers: {"Content-Type": 'application/json'},
    body: JSON.stringify({user: userObj})
  }

  return fetch(url, options)
    .then(r => r.json())
}

export function getUser(userID) {
  const url = `${baseURL}/users/${userID}`

  return fetch(url)
    .then(r => r.json())
}

export function createStock(stock) {
  // console.log("stock saved: ", stock);

  const url = `${baseURL}/stocks/`
  const options = {
    method: "POST",
    headers: {"Content-Type": 'application/json'},
    body: JSON.stringify({stock: stock})
  }

  return fetch(url, options)
    .then(r => r.json())
    // .then(stock => console.log(stock))
}

export function createPortfolio(portfolio) {
  const url = `${baseURL}/portfolios`
  const options = {
    method: 'POST',
    headers: {"Content-Type" : 'application/json'},
    body: JSON.stringify({portfolio: portfolio})
  }

  return fetch(url, options)
    .then(r => r.json())
    // .then(portfolio => console.log(portfolio))
}

export function deletePortfolio(portfolioID) {
  const url = `${baseURL}/portfolios/${portfolioID}`
  const options = {
    method: "DELETE",
    headers: {"Content-Type" : 'application/json'}
  }

  return fetch(url, options)
    .then(r => r.json())
}

export function saveStockToPortfolio(portfolio_id, stock_id) {
  const url = `${baseURL}/stock_portfolios`
  const options = {
    method: "POST",
    headers: {"Content-Type" : 'application/json'},
    body: JSON.stringify({portfolio_id: portfolio_id, stock_id: stock_id})
  }

  return fetch(url, options)
    .then(r => r.json())
    // .then(stock_port => console.log("saveStockToPortfolio fetch ", stock_port))
}

export function getUsersStocks(currentUser) {
  const url = `${baseURL}/get_stock/${currentUser.id}`

  return fetch(url)
    .then(r => r.json())
    // .then(stocks => console.log(stocks))
}

export function getPortfolios(currentUser) {
  const url = `${baseURL}/user_portfolio/${currentUser.id}`

  return fetch(url)
    .then(r => r.json())
    // .then(userPortfolio => console.log(userPortfolio))
}

export function getPortfolioStocks(portfolioID) {
  const url = `${baseURL}/portfolios/${portfolioID}`

  return fetch(url)
    .then(r => r.json())
    // .then(stocks => console.log(stocks))
}

export function deleteStock(stockID) {
  const url = `${baseURL}/stocks/${stockID}`
  const options = {
    method: "DELETE",
    headers: {"Content-Type" : 'application/json'}
  }

  return fetch(url, options)
    .then(r => r.json())
}
