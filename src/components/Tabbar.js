 
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './Tabbar.css'
export default class Tabbar extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        {/* <a href="#/films"></a> */}
                        <NavLink to="/films" activeClassName="mglactive">电影</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cinemas" activeClassName="mglactive">影院</NavLink>
                    </li>
                    <li>
                        <NavLink to="/center" activeClassName="mglactive">我的</NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}
