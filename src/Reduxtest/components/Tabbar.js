 
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import style from  './Tabbar.module.css'
export default class Tabbar extends Component {
    render() {
        return (
            <div className={style.tabbar}>
                <ul>
                    <li>
                        {/* <a href="#/films"></a> */}
                        <NavLink to="/films" activeClassName={style.mglactive}>电影</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cinemas" activeClassName={style.mglactive}>影院</NavLink>
                    </li>
                    <li>
                        <NavLink to="/center" activeClassName={style.mglactive}>我的</NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}
