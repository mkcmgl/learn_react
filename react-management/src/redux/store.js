import { legacy_createStore as createStore,combineReducers} from "redux"
// 解决 createStore有删除线问题：
// import {legacy_createStore as createStore  } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { CollApsedReducer } from './reducers/CollapsedReducer'
import { LoadingReducer } from "./reducers/LoadingReducer";


const persistConfig = {
    key: 'mgl',
    storage,
    blacklist: ['LoadingReducer']
}

const  reducer  = combineReducers({
    CollApsedReducer,
    LoadingReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer);
const persistor = persistStore(store)

export { store, persistor }