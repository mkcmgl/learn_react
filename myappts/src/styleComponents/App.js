import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

export default class App extends Component {


    render() {
        const StyledInput = styled.input`
         outline:none;
         border-radius:10px;
         border-bottom:1px solid red;
        `

        const StyledDiv = styled.div`
          background:${props => props.bg || 'yellow'};
          width:100px;
          height:100px;
        `
        const StyledChild = styled(Child)`
          background:yellow;
          color:red;
        `

        const StyledButton = styled.button`
          width:100px; 
          height:100px;
          background:yellow
        `
        const StyledButton2 = styled(StyledButton)`
          background:red;
        `
        const StyledButton3 = styled(StyledButton)`
          background:blue;
        `

        const myaniamtion = keyframes`
         from{
             transform:rotate(0deg)
         }
         to{
            transform:rotate(360deg)
        }
        `
        const StyledDiv2 = styled.div`
         width:100px;
         height:100px;
         background:yellow;
         animation: ${myaniamtion} 1s infinite;
        `
        return (
            <div>
                App
                <StyledInput type="password" placeholder="输入" />

                <StyledDiv bg="red"></StyledDiv>
                <StyledChild />
                <StyledButton></StyledButton>
                <StyledButton2></StyledButton2>
                <StyledButton3></StyledButton3>
         
                    <StyledDiv2 />
   
            </div>
        )
    }
}
function Child(props) {
    return <div className={props.className}>
        child
    </div>
}
