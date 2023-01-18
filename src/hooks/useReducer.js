import React, { useReducer, useContext, useEffect } from 'react'
import axios from 'axios'
import './css/index.css'
const reducer = (prevState, action) => {
    let newState = { ...prevState }
    switch (action.type) {
        case "mgl":
            newState.count--
            return newState

        case "mkc":
            newState.count++
            return newState
        case "change-a":
            newState.a = action.value
            return newState
        case "change-b":
            newState.b = action.value
            return newState
        case "change-filmlist":
            newState.filmList = action.value
            return newState
        case "change-info":
            newState.info = action.value
            return newState
        default:
            return prevState
    }

}
const initialState = {
    count: 0,
    a: "11111",
    b: "11111",
    info: "",
    filmList: []
}
const GlobalContext = React.createContext()
export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        axios.get(`/test.json`).then(res => {
            // console.log(res.data.data.films)

            dispatch({
                type: "change-filmlist",
                value: res.data.data.films
            })
        })
    }, [])
    return (
        <GlobalContext.Provider value={
            {
                state,
                dispatch
            }
        }>
            <div>

                <button onClick={() => {
                    dispatch({
                        type: 'mgl'
                    })
                }} >-</button>
                {state.count}
                <button onClick={() => {
                    dispatch({
                        type: 'mkc'
                    })
                }} >+</button>
                <div>
                    <Child1 />
                    <Child2 />
                    <Child3 />
                </div>
                {
                    state.filmList.map(item =>
                        <FilmItem key={item.filmId} {...item} ></FilmItem>
                    )
                }


                <FilmDetail ></FilmDetail>
            </div>
        </GlobalContext.Provider>
    )
}
function Child1() {
    const { dispatch } = useContext(GlobalContext)
    return <div style={{ background: "red" }}>
        <button onClick={() => {
            dispatch({
                type: "change-a",
                value: "2222222"
            })
        }}>改变a</button>
        <button onClick={() => {
            dispatch({
                type: "change-b",
                value: "333333"
            })
        }}>改变b</button>
    </div>
}
function Child2() {
    const { state } = useContext(GlobalContext)
    return <div style={{ background: "yellow" }}>
        child2-{state.a}
    </div> 
}

function Child3() {
    const { state } = useContext(GlobalContext)
    return <div style={{ background: "gray" }}>
        child3-{state.b}
    </div>
}




/*受控组件*/

function FilmItem(props) {
    let { name, poster, grade, synopsis } = props
    const { dispatch } = useContext(GlobalContext)

    // console.log(context)
    return <div className="filmitem" onClick={() => {
        console.log(synopsis,111)
        // this.props.onEvent(synopsis)

        // value.info = "2222222"

        // console.log(value)

        dispatch({
            type: "change-info",
            value: synopsis
        })
    }}>
        <img src={poster} alt={name} />
        <h4>{name}</h4>
        <div>观众评分：{grade}</div>
    </div>
}

function FilmDetail() {
    const { state } = useContext(GlobalContext)
    return <div className="filmdetail">
        detail-{state.info}
    </div>
}
