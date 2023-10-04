import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import { Provider, useDispatch } from 'react-redux';
import { getCountryData, getCountryDataAll,getYearData } from './store/slices/countrySlice';


// store.dispatch(getCountryData('China'));
store.dispatch(getCountryDataAll());
store.dispatch(getYearData())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
