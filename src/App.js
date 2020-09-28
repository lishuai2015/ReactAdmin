import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
// 映射路由
import Login from './pages/login/login';
import Admin from './pages/admin/admin';

/*
应用的根组件
 */
class App extends Component {

    // 事件推荐使用箭头函数的写法，保证 this 正常使用

    render() {
        return (
            <BrowserRouter>
                <Switch>{/* 只匹配其中的一个 */}
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' component={Admin}></Route>
                </Switch>
            </BrowserRouter>
        );
    }

}

export default App;