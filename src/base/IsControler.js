import React, { Component } from 'react'

export default class IsControler extends Component {
  constructor() {
    super();
    this.state = { username: "mgl" };
  }
 
  render() {
    return (
      <div>
        <br />
        <h1>登陆</h1>
        <input
          type="text"
          value={this.state.username}
          onChange={(e) => {
            this.setState({
              username: e.target.value
            });
          }}
        />
        <button
          onClick={() => {
            this.setState({
              username: "",
            });
          }}
        >
          登陆
        </button>
        <button
          onClick={() => {
            this.setState({
              username: "",
            });
          }}
        >
          重置
        </button>
      </div>
    );
  }

}
