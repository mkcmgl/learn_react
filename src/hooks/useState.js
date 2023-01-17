import React, {useState,useEffect} from 'react'
import axios from 'axios'

export default function App() {
    const [text, setText] = useState('')
    const [list, setList] = useState(["aa", "bb", "cc"])
    const [type,setType] = useState(1)
    const handleChange=(e)=>{
        setText(e.target.value)
    }
    const handleAdd = () => { 
        console.log(text)
        setList([...list, text])
        setText("")
    }
    const handleDel = (index) => {
        console.log(index)
        var newList = [...list]
        
        newList.splice(index, 1)
        console.log(newList)
        setList(newList)
    }
    useEffect(() => { },[])
  return (
    <div>
          <input onChange={handleChange} />
          <button onClick={handleAdd} >add</button>
          <ul>
              {
                  list.map((item, index) =>
                      <li key={index}>
                          {item}
                          <button onClick={()=>handleDel(index)}>del</button>
                  </li>)
              }
          </ul>
          {!list.length && <div>暂无待办事项</div>}
          <ul>
              <li onClick={() => {
                  setType(1)
              }}>正在热映</li>
              <li onClick={() => {
                  setType(2)
              }}>即将上映</li>
          </ul>

          <FilmList type={type}></FilmList>
    </div>
  )
}


function FilmList(props) {
    const [list, setListData] = useState([])
    useEffect(() => {
        if (props.type === 1) {
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
                // this.setState({
                //     list:res.data.data.films
                // })

                setListData(res.data.data.films)
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
                setListData(res.data.data.films)
            })
        }
    }, [props.type])


    return <ul>
        {
            list.map(item =>
                <li key={item.filmId}>{item.name}</li>
            )
        }
    </ul>
}

  