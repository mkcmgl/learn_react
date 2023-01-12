/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
import React, { Component } from 'react'
import axios from 'axios'
export default class Cinema extends Component {
  constructor() {
    super();
    this.state = {
      cinemaList: [],
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
    });
  }

  // 后面讲的生命周期函数 更适合发送ajax
  render() {
    return (
      <div>
        <input className="inputCinema" onInput={this.handleInput} />

        {this.state.cinemaList.map((item) => (
          <dl key={item.cinemaId}>
            <dt>{item.name}</dt>
            <dd>{item.address}</dd>
          </dl>
        ))}
      </div>
    );
  }
  handleInput = (e) => { 
    var newList = this.state.bakCinemaList.filter((item) => {
      return (
        item.name.toUpperCase().includes(e.target.value.toUpperCase()) ||
        item.address.toUpperCase().includes(e.target.value.toUpperCase())
      );
    });
    this.setState({ cinemaList: newList })
      console.log(newList)
  }
}
