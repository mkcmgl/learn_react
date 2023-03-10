import React, { Component } from "react";
import "./css/index.css";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

export default class TestCss extends Component {
  // myRef = React.createRef();
  // myListRef = React.createRef();
  constructor() {
    super();
    this.state = {
      myList: "",
      myListDel:'',
      myShow: true,
      list: [
        {
          id: 1,
          text: "1111",
          isChecked: false
        },
        {
          id: 2,
          text: "2222",
          isChecked: false
        },
        {
          id: 3,
          text: "3333",
          isChecked: false
        },
      ],
    };
  }

  render() {
    var styles = {
      backgroundColor: "yellow",
      fontSize: "20px",
    };

    return (
      <div>
        {10 > 20 ? "a" : "b"}
        <div style={styles}>111</div>
        <div className="activeT">3333333333333333333333</div>
        <div id="myapp">5555555555555555</div>
        <label htmlFor="username">用户名：</label>
        <input type="text" id="username" />
        <br />
        <input></input>
        <button onClick={this.handleClick2.bind(this)}>add1</button>
        <button
          onClick={() => {
            this.handleClick4();
          }}
        >
          add2
        </button>
        <button onClick={this.handleClick3}>add3</button>
        <br />
        <input value={this.state.myList} onChange={(e) => { this.setState({
          myList:e.target.value
        })}} />
        <button
          onClick={() => {
            // console.log("ref1", this.refs.myRef.value);
            console.log("ref1", this.state.myList);
          }}
        >
          ref1
        </button>
        <br />
        <button
          onClick={() => {
            this.setState({ myShow: !this.state.myShow });
          }}
        >
          {this.state.myShow ? "收藏" : "取消收藏"}
        </button>
        <br />
        {/* // var newlist = this.state.list.map(item=><li>{item}</li>) */}
        <input value={this.state.myListDel} onChange={(e) => { this.setState({
          myListDel:e.target.value
        })}}/>
        <button onClick={this.handleAddList}> addList </button>
        <ul>
          {this.state.list.map((item, index) => (
            <li key={item.id}>
              {item.text}
              <button onClick={() => this.handleDelClick(index)}>del</button>
            </li>
          ))}
        </ul>
        {/* {this.state.list.length===0 ? <div>暂无待办事项</div>:null} */}
        {/* { this.state.list.length===0  && <div>暂无待办事项</div>} */}
        <div className={this.state.list.length === 0 ? "" : "hidden"}>
          暂无待办事项
        </div>
        <br />
        ****props
        <br />
        <Navbar title="商品" btnShow={true} />
        <Sidebar bg="yellow" position="right" />
        <br />
        *****
      </div>
    );
  }

  handleClick2() {
    console.log(this);

    console.log("click2");
  }

  handleClick3 = () => {
    console.log(this);
    console.log("click3");
  };

  handleClick4 = () => {
    console.log("click4");
  };
  handleAddList = () => {
    // console.log("click2", this.myListRef.current.value);

    // this.setState

    // 不要直接修改状态， 可能会造成不可预期的问题。
    // this.state.list.push(this.myref.current.value)
    if (this.state.myListDel === '') {
      return alert('Please input data')
    }
    let newlist = [...this.state.list];
    newlist.unshift({
      id: Math.round(Math.random() * 100000000), //生成不同id的函数
      text: this.state.myListDel,
    });
    console.log(newlist);
    // console.log()
    this.setState({
      list: newlist,
      myListDel: ''
    });
  };
  handleDelClick = (index) => {
    console.log(this);
    let newList = this.state.list.concat();
    newList.splice(index, 1);
    this.setState({ list: newList });
  };
}
