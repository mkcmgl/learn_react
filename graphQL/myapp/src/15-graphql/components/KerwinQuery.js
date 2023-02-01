  

import {Component} from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'

import mglDelete from './mglDelete'
class mglQuery extends Component{

    query = gql`
        query getNowplayingList($id:String!){
            getNowplayingList(id:$id) {
            id,
            name,
            price
            }
        }
    `
    state = {
        id:""
    }
    render(){
        return <div>
            
            <Query query={this.query} variables={{id:this.state.id}}>
            {
                ({loading, data,refetch})=>{
                    console.log(loading)
                    this.props.fetch(refetch)
                    return loading?<div>loading....</div>:
                    <div>
                        {
                            data.getNowplayingList.map(item=>
                                <div key={item.id} style={{border:"1px solid black",padding:"20px"}}>
                                    <div>名字：{item.name}</div>
                                    <div>价格：{item.price}</div>

                                    <mglDelete id={item.id} cb={()=>{
                                        refetch()
                                    }}></mglDelete>
                                </div>    
                            )
                        }
                    </div>
                }
            }
        </Query>
        </div>
    }
}

export default mglQuery