import React, { Component } from 'react'
import axios from 'axios'
import "./css/conmuniNation.css"
 

var bus = {
  list: [],
  subscribe(callback) { 
    this.list.push(callback)
  },
  publish(text) { 
    this.list.forEach(callback => { 
      callback && callback(text)
    })
  }
}

export default class Middle extends Component {
    constructor() { 
        super()
        this.state = {
            filmList:[]
        }
        axios.get('/test.json').then(res => {
            this.setState({ filmList: res.data.data.films }) 
        })
    }
  render() {
    return (
      <div>
            {this.state.filmList.map(film => <FileItem key={film.filmId} {...film}></FileItem>)}
            <FilmDetails></FilmDetails>
      </div>
    )
    }
}
class FileItem extends Component {
    render() {
        let { name, poster,grade,synopsis } = this.props

      return (
        <div className="filmitem" onClick={() => { 
          bus.publish(synopsis)
        }}>
            <img src={poster} alt={name} />
              <h4>{name}</h4>
          <div>观众评分：{grade}</div>
        </div>
      )
    }
 }
class FilmDetails extends Component { 
  constructor() { 
    super()
    this.state = {
      info:''
    }
    bus.subscribe((info) => { 
      console.log('订阅')
      this.setState({ info: info })
    })
  }
    render() {
      return (
          <div className='filmdetail'>
          {this.state.info}
        </div>
      )
    }
}

