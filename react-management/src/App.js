// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//          React
//         </a>
//       </header>
//     </div>
//   );
// }

import React from 'react'
import IndexRouter from './router'; 
import { store, persistor } from './redux/store';
import { PersistGate } from "redux-persist/integration/react"
import { Provider } from 'react-redux'
import './App.css'
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IndexRouter></IndexRouter>
      </PersistGate>
    </Provider>
  )
}


export default App;
