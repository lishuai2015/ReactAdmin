/*
后台管理主路由组件
*/
import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

import memoryUtils from '../../utils/memoryUtils'


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
            <div>
                Hello {user.username}
            </div>
        )
    }
}