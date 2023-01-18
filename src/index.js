import React from "react";
import ReactDOM from "react-dom/client";

import App from "./hooks/useReducer";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
        // 严格模式
//   <React.StrictMode>
    /* </React.StrictMode> */ 
    <App />
    
);