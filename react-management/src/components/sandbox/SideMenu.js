import React from 'react'
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    NotificationOutlined,
    LaptopOutlined
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom'
import './index.css'


const { Sider } = Layout;

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
function SideMenu(props) {

    const handlerClickMenu = (e) => {
        props.history.push(e.key)
    }

    return (
        <Sider trigger={null} collapsible collapsed={false}>
            <div className="logo" >后台管理系统</div>

            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                items={items}
                onClick={handlerClickMenu}
            />
        </Sider>
    )
}
export default withRouter(SideMenu)
