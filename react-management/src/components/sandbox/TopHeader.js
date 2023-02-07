import React, { useState } from 'react'
import { Layout, Dropdown, Space, Avatar } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
const { Header } = Layout;

function TopHeader(props) {
    const [collapsed,setCollapsed] = useState(false)
    const changeCollapsed = () => { 
        setCollapsed(!collapsed)
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
                collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> :
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
export default withRouter(TopHeader)
