  
import React, { Component } from 'react'
import {ApolloProvider,Mutation} from 'react-apollo'
import ApolloClient  from 'apollo-boost'
import gql  from 'graphql-tag'

const client = new ApolloClient({
    uri:"/graphql"
})
export default class App extends Component {
    render() {
        return (
            <ApolloProvider client = {client}>
                <div>
                    <mglUpdate></mglUpdate>
                </div>
            </ApolloProvider>
        )
    }
}

class mglUpdate extends Component{

    createFilm = gql`
    mutation updateFilm($id:String!,$input: FilmInput){

        updateFilm(id:$id,input:$input) {
          id,
          name,
          price
        }
      }
    `
    render(){
        return <div>
            <Mutation mutation={this.createFilm}>
                {
                    (updateFilm,{data})=>{
                        console.log(data)
                        return <div>
                            <button onClick={()=>{
                                updateFilm({
                                    variables:{
                                        id:"61e67c0031bf52b53c9245c7",
                                        input:{
                                            name:"777-修改",
                                            poster:"http://777-修改",
                                            price:700
                                        }
                                    }
                                })
                            }}>update</button>
                        </div>
                    }
                }
            </Mutation>
        </div>
    }
}