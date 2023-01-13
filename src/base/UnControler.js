import React, { Component } from "react";

export default class UnControler extends Component {
  loginName = React.createRef();
  render() {
    return (
      <div>
        <br />
        <h1>登陆</h1>
        <input type="text" defaultValue="mgl" ref={this.loginName} />
        <button
          onClick={() => {
            console.log("Login");
          }}
        >
          登陆
        </button>
        <button
          onClick={() => {
            this.loginName.current.value = "";
          }}
        >
          重置
        </button>
      </div>
      );
      
    }
   
}
