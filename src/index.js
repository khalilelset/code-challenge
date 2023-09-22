import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
//import { registerLincense} from'@syncfusion/ej2-base'
//
//registerLincense("Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCd0x0QXxbf1xzZFRHallQTnRYUj0eQnxTdEZjUH5ZcndQR2JbUEVzWw==")
import rootReducer from "./redux/RootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
     <App />
     </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


