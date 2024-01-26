import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from "../src/App";
import { store } from 'redux';

import './index.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <React.StrictMode>   
        <App />
  </React.StrictMode>
  </Provider>
);


