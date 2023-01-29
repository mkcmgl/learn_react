 
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import stylem from '../css/Tabbar.module.css'
console.log(stylem,'1')
export default class Tabbar extends Component {
    render() {
        return (
            <div className="Tabbar">
                    <ul>
                        <li>
                            {/* <a href="#/films"></a> */}
                        <NavLink to="/films" activeClassName={stylem.mglactive}>电影</NavLink>
                        </li>
                        <li>
                        <NavLink to="/cinemas" activeClassName={stylem.mglactive} onClick={() => {
                            console.log("log", stylem)
                        }}>影院</NavLink>
                        </li>
                        <li>
                            <NavLink to="/center" activeClassName={stylem.mglactive}>我的</NavLink>
                        </li>
                    </ul>
                </div>
        )
    }
}
