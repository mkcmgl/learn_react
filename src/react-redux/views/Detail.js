
import React,{useEffect} from 'react'
import { show,hide } from '../redux/actionCreator/TabbarActionCreator'
// import store from '../redux/store'
import { connect } from 'react-redux'

 function Detail(props) {

    // console.log(props.location.query.myid,"利用id去后端拿数据。")
    // console.log(props.location.state.myid,"利用id去后端拿数据。")
     let { hide,show,match} = props
    useEffect(() => {
        // console.log("create")
        console.log(match.params.myid,"利用id去后端拿数据。")
        //store.dispatch  通知
        // store.dispatch(hide())
        hide()
        return () => {
            console.log("destroy")
            // store.dispatch(show() )
            show()
        }
    }, [match.params.myid,show,hide]);

    return (
        <div>
            deteail
        </div>
    )
} const mapStateToProps = {
    show, hide
}
export default connect(null, mapStateToProps)(Detail)
