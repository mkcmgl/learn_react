import React, { Component } from 'react'

class Navbar extends Component { 

  render() { 
    return <div style={{backgroundColor:'red'}}>
      <button onClick={() => { 
        console.log('子传父')
        this.props.event();
      }}>click</button>
      <span>Navbar</span>
    </div>
  }
}
class Sidebar extends Component {

  render() {
    return <div style={{
      background: "yellow", width: "200px"
    }}  >
      <ul>
        <li>11111</li>
        <li>11111</li>
        <li>11111</li>
      </ul>
    </div>
  }
}

export default class Communication extends Component {
  constructor() { 
    super();
    this.state = {
      isShow:false,
    }
  }
  render() {
    return (
      <div>
        <Navbar event={ this.handleEvent}></Navbar>
        {this.state.isShow && <Sidebar></Sidebar>}
      </div>
    )
  }  
  handleEvent() { 
    console.log("handleEvent")
    this.setState({
      isShow: !this.state.isShow
    })
  }
}
