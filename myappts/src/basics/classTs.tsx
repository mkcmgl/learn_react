import React, { Component } from 'react'
interface IState {
    name: string,
    list: string[],
    isShow:boolean
}
export default class App extends Component<any, IState> {

    state = {
        name: "mgl",
        list: [],
        isShow: true
    }
    myref = React.createRef<HTMLInputElement>()
    render() {
        return (
            <div>
                app - {this.state.name.substring(0, 1).toUpperCase() + this.state.name.substring(1)}
                < button onClick={() => {
                    // this.state.name = 100
                    this.setState({
                        name: "xiaomnig"
                    })
                }
                }> click </button>


                <input ref={this.myref} />
                <button onClick={() => {
                    // console.log(this.state.text)
                    if (this.myref.current!.value === '') return 
                    console.log((this.myref.current as HTMLInputElement).value)

                    this.setState({
                        list: [...this.state.list, (this.myref.current as HTMLInputElement).value]
                    })
                        this.myref.current!.value = ''    
                }}>添加</button>

                {
                    this.state.list.map(item =>
                        <li key={item}>{item}</li>
                    )
                }
                <Child name="bbbb" />
                <Navbar title="首页" cb={() => {
                    console.log("1111")
                    this.setState({
                        isShow: !this.state.isShow
                    })
                }} />

                {this.state.isShow && <Sidebar></Sidebar>}
            </div>
        )
    }
}

interface IProps {
    name: string
}

class Child extends Component<IProps, any>{
    render() { 
        return <div>
            child-{this.props.name}
        </div>
    }
}
interface MyProps {
    title: string,
    cb: () => void
}

class Navbar extends Component<MyProps, any>{
    render() {
        return <div>
            navbar-{this.props.title}
            <button onClick={() => {
                this.props.cb()
            }}>click</button>
        </div>
    }
}

class Sidebar extends Component {
    render() {
        return <div>
            sidebar
        </div>
    }
}