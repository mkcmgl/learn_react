  
import React, { Component, memo } from 'react'

export default class App extends Component {
    state ={
        name:"mgl",
        title:"aaaaaa"
    }
    render() {
        return (
            <div>
                {this.state.name}
                <button onClick={()=>{
                    this.setState({
                        name:"xiaoming"
                    })
                }}>click</button>

                <button onClick={()=>{
                    this.setState({
                        title:"bbbbbbbbbb"
                    })
                }}>click2222</button>

                <Child title={this.state.title}/>
            </div>
        )
    }
}

const Child = memo((props)=>{
    console.log(11111111)
return <div>child-{props.title}</div>
})