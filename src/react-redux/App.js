
import React, { Component } from 'react'
import MRouter from './router/IndexRouter'
import Tabbar from './components/Tabbar'
import { connect } from 'react-redux'
import './views/css/App.css'
 class App extends Component {
    // state = {
    //     isShow: store.getState().TabbarReducer.show
    // }

    componentDidMount() {
        // store.subscribe(()=>{
        //     // console.log("app 中订阅",store.getState())

        //     this.setState({
        //         isShow:store.getState().TabbarReducer.show
        //     })
        // })
    }
    // store.subsribe 订阅
    render() {
        return (
           <div>
                {/* 其他的内容 */}
                <MRouter>
                    {this.props.isShow && <Tabbar></Tabbar>}
                </MRouter>
           </div>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        a: 1,
        b: 2,
        isShow: state.TabbarReducer.get('show')
    }
}
export default connect(mapStateToProps)(App)
/*
 /films ===>Films
 /cinemas ===>Cinemas
 /center ===> Center


 
*/