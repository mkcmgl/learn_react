import { legacy_createStore as createStore,combineReducers} from "redux"
// 解决 createStore有删除线问题：
// import {legacy_createStore as createStore  } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import { CollApsedReducer } from './reducers/CollapsedReducer'


const persistConfig = { 

 }

const { reducer } = combineReducers({
    CollApsedReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer);
const persistor = persistStore(store)

export { store, persistor }