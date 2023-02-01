  
import React, { Component, forwardRef } from 'react'

export default class App extends Component {
    mytext =React.createRef()

    render() {
        return (
            <div>
                <button onClick={()=>{
                    console.log(this.mytext)
                    this.mytext.current.value=""
                    this.mytext.current.focus()
                }}>获取焦点</button>

                <Child ref={this.mytext}/>
            </div>
        )
    }
}

const Child = forwardRef((props,ref)=>{
    return <div style={{background:"red"}}>
        <input ref={ref} defaultValue="22222"/>
    </div>
})