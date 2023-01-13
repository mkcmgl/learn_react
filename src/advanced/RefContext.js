import React, { Component } from 'react'

class Field extends Component {
    state = {
        value: '',
    }
    clear() { 
        this.setState({ value: '' })
    }
    setValue(value) {
        this.setState({
            value: value
        })
    }

    render() {
        return <div>

            <label >{this.props.label}  </label>
            {/* <input type={this.props.type} value={this.props.value} onChange={(e) => { this.props.onChangeEvent(e.target.value) }} /> */}
            <input type={this.props.type} value={this.state.value}
                onChange={(e) => { this.setState({ value: e.target.value }) }} />

        </div>
    }
}

export default class RefContext extends Component {
    // state = {
    //     userName: localStorage.getItem("userName") || '',
    //     password: ''
    // }
    userName = React.createRef()
    password = React.createRef()

    render() {
        return (
            <div>
                <h1>登陆</h1>
                <Field label='用户名' type="text" value={this.state.userName}
                    // onChangeEvent={(value) => {
                    //     this.setState({ userName: value })
                    // }}
                    ref={this.userName}
                >
                    
                    </Field>
                <Field label='密码' type="password" value={this.state.password}
                    // onChangeEvent={(value) => {
                    //     this.setState({ password: value })
                    // }}
                    ref={this.password}
                >
                    
                    </Field>
                <button onClick={() => {
                    // console.log(this.state.username, this.state.password, '发送后端验证')
                    console.log('登陆', this.userName.current.state.value,
                        this.password.current.state.value)
                }}>登陆</button>
                <button onClick={() => {
                    // this.setState({
                    //     userName: '',
                    //     password: ''
                    // })
                    this.userName.current.clear();
                    this.password.current.clear();
                }}>重置</button>

            </div>
        )
    }
}
