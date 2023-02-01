  
import React, { Component } from 'react'
import BetterScroll from 'better-scroll'

export default class App extends Component {
    state = {
        list:[]
    }
    render() {
        return (
            <div>
                <button onClick={()=>this.getData()}>click</button>
                <div className="mglwrapper" style={{height:'200px',background:'yellow',overflow:'hidden'}}>
                    <ul className="mglcontent">
                       {
                           this.state.list.map(item=>
                           <li key={item}>{item}</li>
                            )
                       }
                    </ul>
                </div>
            </div>
        )
    }

    getData(){
        var list =[1,2,3,4,5,6,7,8,9,0,11,12,13,14,15]

        // this.setState({
        //     list:list
        // },()=>{
        //     console.log(this.state.list)
        //     console.log(document.querySelectorAll("li"))
        //     new BetterScroll(".mglwrapper")
        // })


        setTimeout(()=>{
            this.setState({
                list:list
            })

            console.log(this.state.list)
            console.log(document.querySelectorAll("li"))
            new BetterScroll(".mglwrapper")
        },0)
    }
}
