/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
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
                        <NavLink to="/films" activeClassName={stylem.kerwinactive}>电影</NavLink>
                        </li>
                        <li>
                        <NavLink to="/cinemas" activeClassName={stylem.kerwinactive} onClick={() => {
                            console.log("log", stylem)
                        }}>影院</NavLink>
                        </li>
                        <li>
                            <NavLink to="/center" activeClassName={stylem.kerwinactive}>我的</NavLink>
                        </li>
                    </ul>
                </div>
        )
    }
}
