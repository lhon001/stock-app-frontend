export function getStockInfo(symbol) {
  const url = `http://localhost:3000/api/v1/search/${symbol}`

  return fetch(url)
    .then(r => r.json())
}
