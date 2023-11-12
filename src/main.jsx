import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import userReducer from '../Toolkit/userReducer.jsx'
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={userReducer}>
      <App />
    </Provider>
  </React.StrictMode>
);
