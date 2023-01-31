/* eslint-disable jsx-a11y/alt-text */
 
import React, { Component } from 'react'
import axios from 'axios'
import { RouteComponentProps } from 'react-router-dom'

import { Button, Swiper } from 'antd-mobile'
import { SwiperRef } from 'antd-mobile/es/components/swiper'

interface IItem {
    filmId:number,
    name:string
}

// interface IProps{
//     history:any
// }
export default class Film extends Component<RouteComponentProps,any> {
    state = {
        list: [],
        looplist: []
    }
    componentDidMount() {
        axios({
            url:"https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=5420934",
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16395416565231270166529"}',
                'X-Host': 'mall.film-ticket.film.list'
                
            }
        }).then(res=>{
            console.log(res.data.data.films)
            this.setState({
                list:res.data.data.films
            })
        })
        axios({
            url: "https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=1886067",
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16395416565231270166529","bc":"110100"}',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res => {
            console.log(res.data)
            this.setState({
                looplist: res.data.data.films
            })
        })
    }
    ref = React.createRef<SwiperRef>()
    render() {
        return (
            <div>
                <Swiper loop autoplay ref={this.ref}>
                    {
                        this.state.looplist.map((item: any) =>
                            <Swiper.Item key={item.filmId}>
                                <img src={item.poster} style={{ width: "100%" ,height:"500px"}} />
                            </Swiper.Item>
                        )
                    }

                </Swiper>
                <Button color="danger" onClick={() => {
                    this.ref.current?.swipePrev()
                }}>上一个</Button>
                <Button color="primary" onClick={() => {
                    (this.ref.current as SwiperRef).swipeNext()
                }}>下一个</Button>
                <ul>
                    {
                        this.state.list.map( (item:IItem)=>
                        <li key={item.filmId} onClick={()=>{
                            // console.log(this.props.histor)
                            // this.props.histor.push()
                            this.props.history.push(`/detail/${item.filmId}`)
                        }}>{item.name}</li>    
                        )
                    }
                </ul>
            </div>
        )
    }
}
