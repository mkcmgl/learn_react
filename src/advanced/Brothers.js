import React, { Component } from 'react'
import axios from 'axios'
import "./css/conmuniNation.css"


var bus = {
  list: [],
  //订阅
  subscribe(callback) {
    this.list.push(callback)
  },
  //发布
  publish(text) {
    this.list.forEach(callback => {
      callback && callback(text)
    })
  }
}


var GlobalContext = React.createContext()

export default class Middle extends Component {

 UNSAFE_componentWillMount() { console.log('1 will mount') }

  gerDerivedStateFromProps() { console.log('gerDerivedStateFromProps')}

  componentWillUnmount() { console.log('8 componentWillUnmount  销毁') }

  componentDidMount() { console.log('3 did mount') }

  // getSnapshotBeforeUpdate() {
  //   console.log('#enter getSnapshotBeforeUpdate');
    

  // }

  // componentDidUpdate() {
  //   console.log('#enter componentDidUpdate snapshot = ');
  // }


  constructor() {
    super()
    this.state = {
      filmList: [],
      info: '',
      text:'11111'
    }
    axios.get('/test.json').then(res => {
      this.setState({ filmList: res.data.data.films })
    })
  }
  render() {
    console.log('2 render')

    return (
      <GlobalContext.Provider value={{
        call: "电话", sms: "短信", info: this.state.info, changeInfo: (value) => {
          this.setState({info:value})
         }
      }}>

        <div>
          {this.state.filmList.map(film => <FileItem text={this.state.text} key={film.filmId} {...film}></FileItem>)}
          <FilmDetails></FilmDetails>
        </div>
      </GlobalContext.Provider>

    )
  }


  UNSAFE_componentWillUpdate(prevProps, prevState) {
    console.log('4 componentWillUpdate')
  }
  componentDidUpdate() {
    console.log('5 componentDidUpdate')
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('6 shouldComponentUpdate');
    if (JSON.stringify(this.state) !== JSON.stringify(nextProps)) {
      return true
    }
    return false
  }

}
class FileItem extends Component {
  render() {
    let { name, poster, grade, synopsis } = this.props

    return (
      <GlobalContext.Consumer>
        {
          (value) => {
            console.log('tag', value)
            return (<div className="filmitem" onClick={() => {
              // bus.publish(synopsis)

              value.changeInfo("2222")
            }}>
              <img src={poster} alt={name} />
              <h4>{name}</h4>
              <div>观众评分：{grade}</div>
            </div>
            )
          }
        }
        </GlobalContext.Consumer>

     
    )
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('7 UNSAFE_componentWill',nextProps);
  }
}
class FilmDetails extends Component {
  constructor() {
    super()
    this.state = {
      info: ''
    }
    bus.subscribe((info) => {
      console.log('订阅')
      this.setState({ info: info })
    })
  }

  render() {
    return (
      <GlobalContext.Consumer>
        {
          (value) => {
            return (<div className='filmdetail'>
              {this.state.info}
             context- { value.call}
            </div>)
        }
        }
 
      </GlobalContext.Consumer>
    )
  }

}


