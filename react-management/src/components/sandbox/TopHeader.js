import React  from 'react'
import { Layout, Dropdown, Space, Avatar } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import {  UserOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
const { Header } = Layout;

function TopHeader(props) {
    const changeCollapsed = () => { 
        props.changeCollapsed()
    }
    const { role: { roleName }, username } = JSON.parse(localStorage.getItem("token"))

    const items = [
        {
            key: '1',
            label: (
                <div>
           
                    {roleName}
                </div>
            ),
        },
        {
            key: '4',
            danger: true,
            label: '退出',

            onClick: () => { 
                localStorage.removeItem("token")
                props.history.replace("/login")
            }
        },
    ];
    return (
        <Header className="site-layout-background" style={{ padding:' 0 16px '}}>
            {
                props.isCollapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> :
                    <MenuFoldOutlined onClick = { changeCollapsed } />
            }
            <div style={{ float: 'right' }}>
                <Space>
                    <span>欢迎<span style={{ fontWeight: "bold", color:'#1890ff' }}>{username}</span>回来</span>
                <Dropdown
                    menu={{items}}
                >
                     
                        <Avatar size="small" style={{
                            backgroundColor: '#87d068',
                        }} icon={<UserOutlined />} />
                        
                    </Dropdown>
                </Space>
            </div>
        </Header>

    )
}

const mapStateToProps = ({ CollApsedReducer: { isCollapsed } }) => { 
    return {
        isCollapsed
    }
}
const mapDispatchToProps = {
    changeCollapsed() { 
        return {
            type:'change_collapsed',
        }
}
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopHeader))
