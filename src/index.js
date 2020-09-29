/*
    入口 js
 */
import React from "react";
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'

import App from "./App";

import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'

// 读取 local 中保存user, 保存到内存中
const user = storageUtils.getUser()
if (user && user._id) {
    memoryUtils.user = user
}

/*
将 App 组件渲染到 index 页面的 div 标签上
*/
ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
