import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Icon, Menu} from 'antd';

import logo from '../../assets/images/logo.png'
import './index.less'
import memoryUtils from "../../utils/memoryUtils";

import menuList from '../../config/menuConfig'

const SubMenu = Menu.SubMenu;

/*
左侧导航的组件
 */
class LeftNav extends Component {

    // 根据menu的数据数组生成对应的标签数组
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            /*
            {
              title: '首页', // 菜单标题名称
              key: '/home', // 对应的path
              icon: 'home', // 图标名称
              children: [], // 可能有, 也可能没有
            }

            <Menu.Item key="/home">
              <Link to='/home'>
                <Icon type="pie-chart"/>
                <span>首页</span>
              </Link>
            </Menu.Item>

            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="mail"/>
                  <span>商品</span>
                </span>
              }
            >
              <Menu.Item/>
              <Menu.Item/>
            </SubMenu>
            */
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon}/>
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }

        })
    }

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
                    {/*


                    <Menu.Item key="1">
                        <Link to='/home'>
                            <Icon type="pie-chart"/>
                            <span>首页</span>
                        </Link>
                    </Menu.Item>

                    <SubMenu
                        key="sub1"
                        title={<span>
                            <Icon type="mail"/>
                            <span>商品</span>
                        </span>}>
                        <Menu.Item key="5">
                            <Icon type="mail"/>
                            <span>品类管理</span>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Icon type="mail"/>
                            <span>商品管理</span>
                        </Menu.Item>
                    </SubMenu>
                    */}
                    {
                        this.getMenuNodes(menuList)
                    }

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