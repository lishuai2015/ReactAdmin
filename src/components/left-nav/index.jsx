import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Icon, Menu} from 'antd';

import logo from '../../assets/images/logo.png'
import './index.less'
import memoryUtils from "../../utils/memoryUtils";

const SubMenu = Menu.SubMenu;

/*
左侧导航的组件
 */
class LeftNav extends Component {



    render() {

        return (
            <div className="left-nav">
                <Link to='/' className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>硅谷后台</h1>
                </Link>

                <Menu
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="1">
                        <Icon type="pie-chart"/>
                       <span>首页</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={<span>
                            <Icon type="mail"/>
                            <span>商品</span>
                        </span>}
                    >
                        <Menu.Item key="5">
                            <Icon type="mail"/>
                            <span>品类管理</span>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Icon type="mail"/>
                            <span>商品管理</span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}

/*
withRouter高阶组件:
包装非路由组件, 返回一个新的组件
新的组件向非路由组件传递3个属性: history/location/match
 */
export default withRouter(LeftNav)