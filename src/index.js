import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./react-redux/App"

import store from "./react-redux/redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
        // 严格模式
//   <React.StrictMode>
    /* </React.StrictMode> */ 
    <Provider store={store}>
        <App />
    </Provider>
    
);