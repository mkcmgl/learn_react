import React, { Component } from "react";
import ClaseT from "./KerwinApp";
import TestCss from "./TestCss";
import Game from "./Game";
import IsControler from "./IsControler";

import CinemaSelect from "./CinemaSelect";
class Child extends Component {
  render() {
    return <div> Child </div>;
  }
}
class Navbar extends Component {
  render() {
    return (
      <div>
        {""}navbar
        <Child></Child>
      </div>
    );
  }
}
class Swiper extends Component {
  render() {
    return <div>Swiper</div>;
  }
}
const Tabbar = () => <div>tabbar</div>;

export default class App extends Component {
  render() {
    return (
      <div>
        <CinemaSelect />

        <ClaseT />
        <Navbar />
       

        <Swiper />
        <Tabbar> </Tabbar>
        <TestCss></TestCss>
        <Game />
        <IsControler/>

      </div>
    );
  }
}
