import React, { Component } from 'react'
import axios from 'axios'
 import "./css/conmuniNation.css"
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
        let { name, poster } = this.props

      return (
          <div className="filmitem" >
            <img src={poster} alt={name} />
              <h4>{name}</h4>
        </div>
      )
    }
 }
class FilmDetails extends Component { 
    render() {
      return (
          <div className='filmdetail'>
          
        </div>
      )
    }
}

