import React, { Component } from 'react'
import MRouter from './router/index'
import Tabbar from './components/Tabbar'
import './pages/css/App.css'
export default class App extends Component {
  render() {
    return (
      <div>
            <MRouter>
                <Tabbar></Tabbar>
            </MRouter>
      </div>
    )
  }
}
