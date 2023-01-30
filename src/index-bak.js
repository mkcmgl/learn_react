import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// import App from "./react-redux/App"

// import App from "./antd/app"

import App from "./ant-mobile/App"



import {store,persistor} from "./react-redux/redux/store";
import { PersistGate } from 'redux-persist/integration/react'
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
        // 严格模式
//   <React.StrictMode>
    /* </React.StrictMode> */ 
    
    
    
    
    
    <Provider store={store}>
        <PersistGate loading={null}  persistor={persistor}>
            <App />
            </PersistGate>
    </Provider>
    
);