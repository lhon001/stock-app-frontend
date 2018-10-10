const defaultState = {
  content: '',
  stock: '',
  invalidSymbol: '',
  signUpState: false,
  loginState: false,
  currentUser: null,
  UserPageDisplayState: null,
  currentPortfolioStocks: [],
  currentPortfolioID: null,
  currentStockInfo: [],
  currentUserPortfolios: [],
  stockSymbolArray: [],
  newsArray: [],
  portfolioGraphsPrices: [],
  portfolioGraphsDates: []
}

const reducer = (state = defaultState, action = {}) => {
  switch (action.type){
    case 'SAVE_SEARCHED_STOCK':
      return {...state, stock: action.payload.stockObj, content: action.payload.content}
    case 'SIGNUP':
      return {...state, signUpState: action.payload.signUpState, content: action.payload.content}
    case 'SHOW_USER_PAGE':
      return {...state, currentUser: action.payload.currentUser, content: action.payload.content}
    case 'LOGIN':
      return {...state, loginState: action.payload.loginState, content: action.payload.content}
    case 'LOGOUT':
      return {...state, loginState: action.payload.loginState, currentUser: action.payload.currentUser, content: ''}
    case 'INVALID_STOCK_SYMBOL':
      return {...state, content: action.payload.content}
    case 'SAVE_STOCK_TO_PORTFOLIO':
      return {...state, currentUser: action.payload.currentUser, stock: action.payload.stock}
    case 'SET_CURRENT_PORTFOLIO_STOCKS':
      return {...state, currentPortfolioStocks: action.payload.currentPortfolioStocks}
    case 'CURRENT_PORTFOLIO_ID':
      return {...state, currentPortfolioID: action.payload.currentPortfolioID}
    case 'STOCK_INFO':
      // console.log('inside STOCK_INFO: ', action.payload.currentStockInfo);
      return {...state, currentStockInfo: [...state.currentStockInfo, action.payload.currentStockInfo]}
      // return {...state, currentStockInfo: action.payload.currentStockInfo}
    case 'RESET_STOCK_INFO_ARRAY':
      return {...state, currentStockInfo: []}
    case 'RESET_STOCK_INFO_ROW':
      return {...state, currentPortfolioID: action.payload.currentPortfolioID}
    case 'DELETE_STOCK_INFO':
      return {...state, currentStockInfo: [...state.currentStockInfo.filter( stock => stock.id !== action.payload.stockID)]}
    case 'CURRENT_PORTFOLIOS':
      return {...state, currentUserPortfolios: action.payload.currentUserPortfolios}
    case 'DELETE_PORTFOLIO':
      return {...state, currentUserPortfolios: [...state.currentUserPortfolios.filter( portfolio => portfolio.id !== action.payload.portfolioID)]}
    case 'LOAD_ALL_STOCK_SYMBOLS':
      return {...state, stockSymbolArray: action.payload.stockSymbolArray}
    case 'LOAD_NEWS':
      return {...state, newsArray: action.payload.newsArray}
    case 'CLEAR_STOCK_NEWS':
      return {...state, newsArray: []}
    case 'DELETE_USER':
      return {...state, currentUser: action.payload.currentUser}
    case 'SET_PORTFOLIO_GRAPH_PRICES':
      return {...state, portfolioGraphsPrices: action.payload.portfolioGraphsPrices}
    case 'SET_PORTFOLIO_GRAPH_DATES':
      return {...state, portfolioGraphsDates: action.payload.portfolioGraphsDates}
    case 'INVALID_SYMBOL':
      return {...state, invalidSymbol: action.payload.invalidSymbol}
    default:
      return state
  }
}

export default reducer
