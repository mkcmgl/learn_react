import React, { Component } from 'react'
import { Map, List,fromJS, setIn } from 'immutable'
// 引用复制 (浅复制)
var obj = {
    name: "mgl"
}
var obj2 = obj
obj2.name = "xiaomoing"
console.log(obj, obj2)


// 比浅复制多复制了一层
var myobj = {
    name: "mgl",
    arr: [1, 2, 3]
}
var myobj2 = {
    ...myobj
}
myobj2.name = "xiaoming"
myobj2.arr.splice(1, 1)
console.log(myobj, myobj2)

// json-parse json-stringify -深复制- 不能有undefined

var jsonobj = {
    name: "mgl",
    arr: [1, 2, 3],
    address: undefined
}

var jsonobj2 = JSON.parse(JSON.stringify(jsonobj))
jsonobj2.name = "xiaoming"
jsonobj2.arr.splice(1, 1)

console.log(jsonobj, jsonobj2)

// deepcopy
// 递归深复制-一层层复制， 性能不好，占用内存

// 1. npm i immutabel
var mglObj = {
    name: 'mgl',
    age:23
}
var oldMglObj = Map(mglObj)
var newMglObj = oldMglObj.set("name", "mkc")
console.log(oldMglObj.toJS(), newMglObj.toJS())



// list
var arr = List([1, 2, 3])

var arr2 = arr.push(4) //不会影响老的对象结构
var arr3 = arr2.concat([5, 6, 7])
console.log("****LIST****",arr.toJS(), arr2.toJS(), arr3.toJS())


export default class App extends Component {
    state = {
        info: Map({
            name: "mgl",
            age: 100,
            select: "aa",
            filter: Map({
                text: "",
                up: true,
                down: false
            })
        })
    }
    componentDidMount() {
        // console.log(this.state.info.filter)
        console.log(this.state.info.get("filter"))
    }
  render() {
    return (
      <div>
            <button onClick={() => { 
                // var old=Map(this.state.info)
                // var newInfo=old.set("name","mkc").set("age",23)
                // this.setState({
                //     info: newInfo.toJS()
                // })
                this.setState({
                    info: this.state.info.set("name", "xiaoming").set("select", "dwadwa")
                })
            }}>click</button>
            {/* { this.state.info.name}
            {this.state.info.age} */}
            {/* <Child filter={this.state.info.filter} /> */}
            {this.state.info.get("name")}
            <Child filter={this.state.info.get("filter")} />
            <ListApp/>
      </div>
    )
  }
}

class Child extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        console.log("componentDidUpdate", this.props.filter)
        if (this.props.filter === nextProps.filter) {
            return false
        }

        return true
    }


    render() {
        return <div>
            child
        </div>
    }

    componentDidUpdate() {
        console.log("componentDidUpdate", this.props.filter)
    }
}
class ListApp extends Component { 

    state = {
        info: Map({
            name: 'mgl',
            location: Map({
                province: "辽宁",
                city:"大连"
            }),
            favor:List(["学习","游戏"])
        }),
        infoData: fromJS({
            name: 'mgl',
            location: Map({
                province: "辽宁",
                city: "大连"
            }),
            favor: List(["学习", "游戏"])
        })
    }
    componentDidMount() { 
        console.log(this.state.infoData,"infoData: " )
    }
    render() { 
        return (
            <>
                <div>个人信息</div>
                <button onClick={() => { 
                    this.setState({
                        info: this.state.info.set("name", "mkc").set(
                            "location", this.state.info.get("location").set("city", "沈阳"))
                    })
                }}>修改</button>
                <div>
                    {this.state.info.get("name")}
                    <br />
                    {
                        this.state.info.get("location").get("province")
                    }-{
                        this.state.info.get("location").get("city")
                    }
                    <br />
                    {this.state.info.get("favor").map((item ,index)=>
                        <li key={index}>{item} <button onClick={() => { 
                            this.setState({
                                info: this.state.info.set("favor",
                                this.state.info.get("favor").splice(index,1)
                                )
                            })
                        }}>del</button></li>)}
                </div>

                        {/* //************************************* ? */}

                <div style={{ backgroundColor: "yellow", }}>个人信息data
                <button onClick={() => {
                    this.setState({
                        infoData: this.state.infoData.setIn(["name"], "mkc").setIn(["location","city"], "沈阳")
                    })
                }}>修改</button>
                <div>
                        {this.state.infoData.get("name")}
                    <br />
                    {
                            this.state.infoData.get("location").get("province")
                    }-{
                            this.state.infoData.get("location").get("city")
                    }
                    <br />
                        {this.state.infoData.get("favor").map((item, index) =>
                        <li key={index}>{item} <button onClick={() => {
                            this.setState({
                                infoData: this.state.infoData.updateIn(["favor"],
                                   (list)=>list.splice(index, 1)
                                )
                            })
                        }}>del</button></li>)}
                    </div>
                </div>
            </>
        )
    }
}
