import React, { Component } from 'react'
import axios from 'axios';
export default class LifeCycle extends Component {

    state = {
        myName: 'mgl',
        myAge: 100,
        type: 1,
        emailList: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
    myRefLife = React.createRef()

    static getDerivedStateFromProps(nextProps, nextState) {
        console.log(' getDerivedStateFromProps', nextProps, nextState,);
        return {
            myName: nextState.myName.substring(0, 1).toUpperCase() + nextState.myName.substring(1),
        }
    }
    getSnapshotBeforeUpdate = (prevProps, prevState) => {
        return {
            data:'test',
            value:this.myRefLife.current.scrollHeight
        }

    }
     
    componentDidUpdate(prevProps, prevState, value) { 
        console.log(prevProps, prevState, value, '1111')
        this.myRefLife.current.scrollTop += this.myRefLife.current.scrollHeight - value.value;

    }
    render() {
        return (
            <div>
                <button onClick={() => {
                    this.setState({
                        myName: 'xiaoming'
                    })
                }}></button>
                app-{this.state.myName}-{this.state.myAge}

                <ul>
                    <li onClick={() => {
                        this.setState({
                            type: 1
                        })
                    }}>正在热映</li>
                    <li onClick={() => {
                        this.setState({
                            type: 2
                        })
                    }}>即将上映</li>
                </ul>

                <FilmList type={this.state.type}></FilmList>
                <button onClick={() => {
                    console.log('tag',this.myRefLife)

                    this.setState({
                        emailList: [...[11, 22, 33, 44, 55, 66, 77, 88, 99],
                        ...this.state.emailList]
                    })
                }}>添加</button>
                <div style={{ height: "200px", overflow: "auto" }} ref={this.myRefLife}>
                    <ul>
                        {
                            this.state.emailList.map((item) => <li key={item}
                                style={{ height: "100px", backgroundColor: "yellow" }}
                            >{item}</li>)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

class FilmList extends Component {
    state = {
        list: [],
        type: 1,
       
    }
    //初始化-执行一次
    componentDidMount() {
        // console.log(this.props.type)
        if (this.props.type === 1) {
            //请求卖座正在热映的数据
            console.log("请求卖座正在热映的数据")
            axios({
                url: "https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=6369301",
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16395416565231270166529","bc":"110100"}',
                    'X-Host': 'mall.film-ticket.film.list'
                }
            }).then(res => {
                console.log(res.data.data.films)
                this.setState({
                    list: res.data.data.films
                })
            })
        } else {
            //请求卖座即将上映的数据

            console.log("请求卖座即将上映的数据")

            axios({
                url: "https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=2&k=8077848",
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16395416565231270166529","bc":"110100"}',
                    'X-Host': 'mall.film-ticket.film.list'
                }
            }).then(res => {
                console.log(res.data.data.films)
                this.setState({
                    list: res.data.data.films
                })
            })
        }
    }

    static getDerivedStateFromProps(nextProps, nextState) {
        // console.log(this)
        console.log("getDerivedStateFromProps", nextProps)

        return {
            type: nextProps.type,
        }
    }

    componentDidUpdate(prevProps, prevState,value) {
        if (this.state.type === prevState.type) {
            return
        }

        if (this.state.type === 1) {
            //请求卖座正在热映的数据
            console.log("请求卖座正在热映的数据")
            axios({
                url: "https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=6369301",
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16395416565231270166529","bc":"110100"}',
                    'X-Host': 'mall.film-ticket.film.list'
                }
            }).then(res => {
                console.log(res.data.data.films)
                this.setState({
                    list: res.data.data.films
                })
            })
        } else {
            //请求卖座即将上映的数据

            console.log("请求卖座即将上映的数据")
            axios({
                url: "https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=2&k=8077848",
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16395416565231270166529","bc":"110100"}',
                    'X-Host': 'mall.film-ticket.film.list'
                }
            }).then(res => {
                console.log(res.data.data.films)
                this.setState({
                    list: res.data.data.films
                })
            })
        }
    }
   
    render() {
        return (<div>
            <ul>
            {
                this.state.list.map(item =>
                    <li key={item.filmId}>{item.name}</li>
                )
            }
            </ul>
          
        </div>
        )
    }
}
