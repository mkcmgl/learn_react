  

 import React,{useReducer} from 'react'
 //处理函数
 const reducer = (prevState,action)=>{
     console.log("reduercer",prevState,action)
     let newstate = {...prevState}
     switch(action.type){
         case "mgl-minus":
            newstate.count--
            return newstate

         case "mgl-add":
            newstate.count++
            return newstate
        
         default:
            return prevState
     }
 }
 // 外部的对象
 const intialState = {
     count:0,
    //  list:[]
 } 

 export default function App() {
     const [state, dispatch] = useReducer(reducer,intialState)

     return (
         <div>
             <button onClick={()=>{
                 dispatch({
                     type:"mgl-minus"
                 })
             }}>-</button>
             {state.count}
             <button onClick={()=>{
                 dispatch({
                    type:"mgl-add"
                })
             }}>+</button>
         </div>
     )
 }
 