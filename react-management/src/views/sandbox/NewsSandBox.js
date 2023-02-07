import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import SideMenu from "../../components/sandbox/SideMenu"
import TopHeader from "../../components/sandbox/TopHeader"
// import Home from './home/Home'
// import RightList from './right-manage/RightList'
// import RoleList from './right-manage/RoleList'
// import UserList from './user-manage/UserList'
// import Nopermission from './npermission/Nopermission'
import "./NewsSandBox.css"
import NewsRouter from '../../components/sandbox/NewsRouter'
import { Layout } from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const { Content } = Layout
export default function NewsSandBox() {
    NProgress.start()
    useEffect(() => {
        NProgress.done()
    })
    return (
            <Layout>
                <SideMenu></SideMenu>
                <Layout className="site-layout">
                    <TopHeader></TopHeader>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            overflow: 'auto',
                        }}
                >
                    <NewsRouter></NewsRouter>
                    {/* <Switch>
                        <Route path="/home" component={Home} />
                        <Route path="/user-manage/list" component={UserList} />
                        <Route path="/right-manage/role/list" component={RoleList} />
                        <Route path="/right-manage/right/list" component={RightList} />
                        <Redirect from='/' to="/home" exact />
                        <Route path="*" component={Nopermission} />
                    </Switch> */}
                      </Content>
                </Layout>
            </Layout>
    )
}
