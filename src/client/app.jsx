import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import stageReducer from './reducers/stageReducer';
import App from './containers/app/App';

const store = createStore(combineReducers({
  stage: stageReducer,
}));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('.app')
);
