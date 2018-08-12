import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import thunk from 'redux-thunk' applyMiddleware(thunk)
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer/reducer'
// import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// registerServiceWorker();
