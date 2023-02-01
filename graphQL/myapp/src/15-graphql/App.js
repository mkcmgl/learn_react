  
import React, { Component } from 'react'
import {ApolloProvider} from 'react-apollo'
import ApolloClient  from 'apollo-boost'
import mglQuery from './components/mglQuery'
import mglCreate from './components/mglAdd'
const client = new ApolloClient({
    uri:"/graphql"
})

export default class App extends Component {
    refetch = null
    render() {
        return (
            <ApolloProvider client={client}>
                {/* <mglAdd/> */}

                <mglCreate cb={()=>{
                    this.refetch()// 让mglquery 重新请求一遍
                }}/>
                <mglQuery fetch={(refetch)=>{
                    this.refetch = refetch

                    // console.log(this.refetch)
                }}/>
            </ApolloProvider>
        )
    }
}
