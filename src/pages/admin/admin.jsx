/*
后台管理主路由组件
*/
import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

import {Layout} from 'antd'

import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav';
import Header from "../../components/header";


const {Footer, Sider, Content} = Layout

export default class Admin extends Component {
    render() {

        // 从内存中读取 user 对象
        const user = memoryUtils.user
        // 如果内存没有存储 user ==> 当前没有登陆
        if (!user || !user._id) {
            // 自动跳转到登陆(在render()中)
            return <Redirect to='/login'/>
        }

        return (
            <Layout style={{minHeight: '100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{margin: 20, backgroundColor: '#fff'}}>

                    </Content>
                    <Footer style={{textAlign: 'center', color: '#cccccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}