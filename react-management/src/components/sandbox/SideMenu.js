import React from 'react'
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    NotificationOutlined,
    LaptopOutlined
} from '@ant-design/icons';
import './index.css'


const { Sider } = Layout;
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});
console.log('item2', items2)
const items = [
    {
        key: "/home",
        label: "首页",
        icon: <UserOutlined />
    },
    {
        key: "/user-manage",
        label: "用户管理",
        icon: <LaptopOutlined />,
        children: [
            {
                key: "/user-manage/list",
                label: "用户列表",
                // icon: <UserOutlined />
            }
        ]
    },
    {
        key: "/right-manage",
        label: "权限管理",
        icon: <NotificationOutlined />,
        children: [
            {
                key: "/right-manage/role/list",
                label: "角色列表",
                // icon: <UserOutlined />
            },
            {
                key: "/right-manage/right/list",
                label: "权限列表",
                // icon: <UserOutlined />
            }
        ]
    }
]
export default function SideMenu() {
    return (
        <Sider trigger={null} collapsible collapsed={false}>
            <div className="logo" >后台管理系统</div>

            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                items={items}
            />
        </Sider>
    )
}
