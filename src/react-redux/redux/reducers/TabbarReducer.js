 
const TabbarReducer = (prevState={
    show:true
 },action)=>{
    let newState = {...prevState}
    switch(action.type){
       case "mglhide-tabbar":
         newState.show = false
         return newState
       case "mglshow-tabbar":
         newState.show = true
         return newState
       default:
          return prevState
    }
 }
 export default TabbarReducer