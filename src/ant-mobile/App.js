 
import React, { Component } from 'react'
import MRouter from './router/IndexRouter'
import MglTabbar from './components/Tabbar'
import './views/css/App.css'
// import { Button } from 'antd-mobile'
import './util/request'

import {connect} from 'react-redux'
// import store from './redux/store'
class App extends Component {
    componentDidMount() {
        // console.log(this.props)
    }
    // store.subsribe 订阅
    render() {
        return (
           <div>
                {/* <Button color='danger'>click</Button> */}
                {/* 其他的内容 */}
                <MRouter>
                    {this.props.isShow && <MglTabbar></MglTabbar>}
                </MRouter>
           </div>
        )
    }
}
const mapStateToProps = (state)=>{
    // console.log(state)
    return {
        a:1,
        b:2,
        isShow:state.TabbarReducer.show
    }
}
export default  connect(mapStateToProps)(App)


// withRouter(FiltItem) props.mglhistory

/*
 /films ===>Films
 /cinemas ===>Cinemas
 /center ===> Center


 
*/