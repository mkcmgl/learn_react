import React, { Component } from "react";
import PropTypes from "prop-types";
export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    title: PropTypes.string,
    btnShow: PropTypes.bool,
  };
  static defaultProps = {
    btnShow: true,
  };
  render() {
    let { title, btnShow } = this.props;
    return (
      <div>
        navbar-{title}
        {btnShow && <button>btn</button>}
      </div>
    );
  }
}
