import React, { Component } from 'react'
import './css/02-maizuo.css'
import Film from './maizuocomponent/Film'
import Cinema from './maizuocomponent/Cinema'
import Center from './maizuocomponent/Center'
import Tabbar from './maizuocomponent/Tabbar'
import Navbar from './maizuocomponent/Navbar'
import RefContext from './RefContext'
export default class UnControler extends Component {
        state = {
            current: 0,
                    list:[
            {
                id:1,
                text:"电影"
            },
            {
                id:2,
                text:"影院"
            },
            {
                id:3,
                text:"我的"
            }
        ],
    }

    which(){
        // return "2222"

        switch (this.state.current){
            case 0:
                return <Film></Film>
            case 1:
                return <Cinema></Cinema>
            case 2:
                return <Center></Center>

            default:
                return null
        }
    }
  render() {
    return (
        <div>
            <Navbar myevent={()=>{ 
                this.setState({
                    current: 2
                })
            }}> </Navbar>
            {
                this.which()
            }
            
            <RefContext></RefContext>


            <Tabbar current={this.state.current}
                list={this.state.list}
                myevent={(index) => {
                this.setState({
                    current: index
                })
            }}></Tabbar>
      </div>
    )
  }
}
