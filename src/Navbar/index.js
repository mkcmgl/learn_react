import React, { Component } from 'react'

export default class Navbar extends Component {
    constructor() { 
        super();
        this.state = {

        }
    }
    render() {
        let { title}=this.props;
    return (
        <div>
            navbar-{title}
        
      </div>
    )
  }
}
