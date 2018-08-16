const baseURL = `http://localhost:3000/api/v1`

export function getStockInfo(symbol) {
  const url = `${baseURL}/search/${symbol}`

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
