import React, { useEffect, useState } from 'react'
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
import axios from 'axios';

const { Sider } = Layout;

// const items = [
//     {
//         key: "/home",
//         label: "首页",
//         icon: <UserOutlined />
//     },
//     {
//         key: "/user-manage",
//         label: "用户管理",
//         icon: <LaptopOutlined />,
//         children: [
//             {
//                 key: "/user-manage/list",
//                 label: "用户列表",
//                 // icon: <UserOutlined />
//             }
//         ]
//     },
//     {
//         key: "/right-manage",
//         label: "权限管理",
//         icon: <NotificationOutlined />,
//         children: [
//             {
//                 key: "/right-manage/role/list",
//                 label: "角色列表",
//                 // icon: <UserOutlined />
//             },
//             {
//                 key: "/right-manage/right/list",
//                 label: "权限列表",
//                 // icon: <UserOutlined />
//             }
//         ]
//     }
// ]
function SideMenu(props) {
    const [menu, setMenu] = useState([])
    useEffect(() => { 
        axios.get("http://localhost:5000/rights?_embed=children").then((response) => {
            // console.log(response)
        //    response.data.forEach((items) => {
        //        items.children.forEach((children) => children.label = children.title)
        //        items.label = items.title
        //         if (items.id === 1) { 
        //             items.label = items.title
        //             items.children=''
                    
        //         }
        //     })
            setMenu(response.data)
         })
    },[])
    const obj = (key, icon, label, children) => {
        return {
            key,
            icon,
            label,
            children,
        }
    }
    const iconList = {
        "/home": <UserOutlined />,
        "/user-manage": <UserOutlined />,
        "/right-manage": <UserOutlined />,

        "/news-manage": <UserOutlined />,
        "/audit-manage": <UserOutlined />,
        "/publish-manage": <UserOutlined />
        //.......
    }

    const { role: { rights } } = JSON.parse(localStorage.getItem("token"))
    //登陆检查

    const checkPagePermission = (item) => {
        // console.log("Checking ", item)
        // console.log("permissions ", JSON.parse(localStorage.getItem("token")))
        return item.pagepermisson && rights.includes(item.key)
    }

    
    const handlerMenu = (list) => {
        const arr = []
            list.map((item) => {
                if (item.children && item.children.length !== 0 && checkPagePermission(item)) {
                    return arr.push(
                        obj(item.key, iconList[item.key], item.title, handlerMenu(item.children))
                    )
                } else {
                    return (
                        checkPagePermission(item) &&
                        arr.push(obj(item.key, iconList[item.key] , item.title))
                    )
                }
            })
       
        return arr
    }
    const handlerClickMenu = (e) => {
        props.history.push(e.key)
    }
    const selectKeys = [props.location.pathname]
    const openKeysRouter = ['/' + props.location.pathname.split("/")[1]]
    const [openKeys, setOpenKeys] = useState(openKeysRouter);


    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => { 
            return openKeys.indexOf(key) === -1
        });
        // console.log(latestOpenKey)
        // console.log(keys,'keys')
        // console.log(menu.find(item => latestOpenKey === item.key), '11')
        
    //    let index= menu.findIndex(item => {
    //         console.log(`output->`, item.key,latestOpenKey)
    //        return item.key === latestOpenKey
    //    })
        
        // console.log(menu.filter(item => latestOpenKey === item.key), '22')
        // console.log(`output->index`, index)
        // console.log(openKeys)
        // setOpenKeys([latestOpenKey])
        if (menu.findIndex(item => item.key === latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (
        <Sider trigger={null} collapsible collapsed={false}>
            <div style={{ display: "flex", height: "100%", "flexDirection": "column" }} >
            <div className="logo" >后台管理系统</div>

            <Menu
                theme="dark"
                mode="inline"
                 
                    items={handlerMenu(menu)}
                    // defaultSelectedKeys={openKeys}
                    onClick={handlerClickMenu}

                    openKeys={openKeys}
                    onOpenChange={onOpenChange}

                    defaultOpenKeys={openKeysRouter}

                    selectedKeys={selectKeys}
                />
                </div>
        </Sider>
    )
}
export default withRouter(SideMenu)
