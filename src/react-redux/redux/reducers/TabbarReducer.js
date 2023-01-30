import { fromJS } from "immutable"
const TabbarReducer = (prevState = fromJS({
    show:true
 }),action)=>{
   //  let newState = {...prevState}
    switch(action.type){
       case "mglhide-tabbar":
         // newState.show = false
          return prevState.set("show", false)
       case "mglshow-tabbar":
         // newState.show = true
          return prevState.set("show", true)
       default:
          return prevState
    }
 }
 export default TabbarReducer