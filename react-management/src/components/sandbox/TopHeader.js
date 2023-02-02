import React, { useState } from 'react'
import { Layout, Dropdown, Space, Avatar } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
const { Header } = Layout;

export default function TopHeader() {
    const [collapsed,setCollapsed] = useState(false)
    const changeCollapsed = () => { 
        setCollapsed(!collapsed)
    }

    const items = [
        {
            key: '1',
            label: (
                <div>
           
                    name
                </div>
            ),
        },
        {
            key: '4',
            danger: true,
            label: '退出',
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
                <span>欢迎admin回来</span>
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
