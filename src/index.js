/*
    入口 js
 */

import React from "react";
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'

import App from "./App";

/*
将 App 组件渲染到 index 页面的 div 标签上
*/
ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
