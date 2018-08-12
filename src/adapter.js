export function getStockInfo(symbol) {
  const url = `http://localhost:3000/api/v1/search/${symbol}`

  return fetch(url)
    .then(r => r.json())
}

export function createUser(userObj) {
  const url = `http://localhost:3000/api/v1/users`
  const options = {
    method: "POST",
    headers: {"Content-Type": 'application/json'},
    body: JSON.stringify({user: userObj})
  }

  return fetch(url, options)
    .then(r => r.json())
    .then(user => console.log(user))
}

export function loginUser(userObj) {
  const url = `http://localhost:3000/api/v1/login`
  const options = {
    method: "POST",
    headers: {"Content-Type": 'application/json'},
    body: JSON.stringify({user: userObj})
  }

  return fetch(url, options)
    .then(r => r.json())
    // .then(user => console.log(user))
}
