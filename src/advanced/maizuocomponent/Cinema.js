 
import React, { Component } from 'react'
import axios from 'axios'
import BScroll from 'better-scroll';

export default class Cinema extends Component {
  constructor() {
    super();
    this.state = {
      cinemaList: [],
      text:'',
      bakcinemaList: [],
    };
    //axios 第三方的库， 专门用于请求数据
    // axios.get("请求地址").then(res=>{}).catch(err=>{console.log(err)})

    // axios.get("https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=7406159").then(res=>{
    //     console.log(res)
    // }).catch(err=>{
    //     console.log(err)
    // })

    axios({
      url: "https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=2878723",
      method: "get",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"16395416565231270166529","bc":"110100"}',

        "X-Host": "mall.film-ticket.cinema.list",
      },
    }).then((res) => {
      console.log(res.data);
      this.setState({
        cinemaList: res.data.data.cinemas,
        bakCinemaList: res.data.data.cinemas,
      });
      console.log(1);

    new BScroll(".cinemaData");

    });
  }

  // 后面讲的生命周期函数 更适合发送ajax
  render() {
    return (
      <div>
        <input className="inputCinema" value={this.state.text} onChange={(e) => this.handleChange(e)} />
        <div
          className="cinemaData"
          style={{
            height: "500px",
            overflow: "hidden",
          }}
        >
          <div className="mglcontent">
            {this.getCinemaList().map((item) => (
              <dl key={item.cinemaId}>
                <dt>{item.name}</dt>
                <dd>{item.address}</dd>
              </dl>
            ))}
          </div>
        </div>
      </div>
    );
  }
  // handleInput = (e) => {
  //   var newList = this.state.bakCinemaList.filter((item) => {
  //     return (
  //       item.name.toUpperCase().includes(e.target.value.toUpperCase()) ||
  //       item.address.toUpperCase().includes(e.target.value.toUpperCase())
  //     );
  //   });
  //   this.setState({ cinemaList: newList }, () => {

  //    });
  //   console.log(newList);
  // };
  getCinemaList() { 
    return this.state.cinemaList.filter((item) => {
      return (
        item.name.toUpperCase().includes(this.state.text.toUpperCase()) ||
        item.address.toUpperCase().includes(this.state.text.toUpperCase())
      );
    });
  }
  handleChange = (e) => { 
    this.setState({
      text: e.target.value
    })
  }
  /*
    setState处在同步的逻辑中，  异步更新状态，更新真实dom
    setState处在异步的逻辑中，  同步更新状态，同步更新真实dom,

    setState 接受第二个参数， 第二个参数式回调函数， 状态和dom更新完后就会被触发。

    
*/
}
