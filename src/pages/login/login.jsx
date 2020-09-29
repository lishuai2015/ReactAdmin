/*
    用户登陆的路由组件
*/
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {Button, Form, Icon, Input, message} from 'antd';

import logo from '../../assets/images/logo.png';
import './login.less';
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

const Item = Form.Item; // 不能写在import之前

class Login extends Component {

    handleSubmit = (event) => {
        // 阻止事件的默认行为
        event.preventDefault();

        // const form = this.props.form;
        // const values = form.getFieldsValue();
        // console.log('handleSubmit()', values)

        // 对所有表单字段进行检验
        this.props.form.validateFields(async (err, values) => {
            console.log(err);
            if (!err) {
                console.log('提交登陆的ajax请求', values)
                const {username, password} = values

                const result = await reqLogin(username, password) // {status: 0, data: user}  {status: 1, msg: 'xxx'}
                console.log('请求成功', result)
                if (result.status === 0) { // 登陆成功
                    // 提示登陆成功
                    message.success('登陆成功')

                    /* 保存user */
                    const user = result.data
                    // 保存在内存中
                    memoryUtils.user = user
                    // 保存到 local 中
                    storageUtils.saveUser(user)

                    // 跳转到管理界面 (不需要再回退回到登陆)
                    this.props.history.replace('/')  // 不能回退上一步
                    // this.props.history.push('/')    // 能回退上一步

                } else {
                    // 提示错误信息
                    message.error(result.msg)
                }

            } else {
                console.log('检验失败!')
            }
        });

    }

    /*
        对密码进行自定义验证
    */
    /*
        用户名/密码的的合法性要求
            1). 必须输入
            2). 必须大于等于4位
            3). 必须小于等于12位
            4). 必须是英文、数字或下划线组成
    */
    validatePwd = (rule, value, callback) => {
        // console.log('validatePwd()', rule, value)
        if (!value) {
            callback('密码必须输入');
        } else if (value.length < 4) {
            callback('密码长度不能小于4位');
        } else if (value.length > 12) {
            callback('密码长度不能大于12位');
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是英文、数字或下划线组成');
        } else {
            callback(); // 验证通过
        }
        // callback('xxxx') // 验证失败, 并指定提示的文本
    }


    render() {

        // 如果用户已经登陆, 自动跳转到管理界面
        const user = memoryUtils.user
        if (user && user._id) {
            return <Redirect to='/'/>
        }

        // 得到具强大功能的 form 对象
        const form = this.props.form;
        const {getFieldDecorator} = form;

        return (
            <div className="login">
                <header className='login-header'>
                    <img src={logo} alt="logo"/>
                    <h1>React 项目: 后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登陆</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>

                            {/*
                            getFieldDecorator(id, options)
                                id —— 配置对象
                                options —— 选项
                            */}

                            {
                                getFieldDecorator('username', { // 配置对象: 属性名是特定的一些名称
                                    // 声明式验证: 直接使用别人定义好的验证规则进行验证
                                    rules: [
                                        {required: true, whitespace: true, message: '用户名必须输入'},
                                        {min: 4, message: '用户名至少4位'},
                                        {max: 12, message: '用户名最多12位'},
                                        {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'},
                                    ],
                                    initialValue: 'admin', // 初始值
                                })(<Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                          placeholder="用户名"/>)
                            }
                        </Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        {
                                            validator: this.validatePwd
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )
                            }
                        </Form.Item>
                        <Item><Button type="primary" htmlType="submit" className="login-form-button">登录</Button></Item>
                    </Form>
                </section>
            </div>
        );
    }
}


/*
知识点：
1. 高阶函数
    1). 一类特别的函数
        什么情况是高阶函数？ 1）接受函数类型的参数； 2）返回值是函数
    2). 常见
        a. 定时器: setTimeout()/setInterval()
        b. Promise: Promise(() => {}) then(value => {}, reason => {})
        c. 数组遍历相关的方法: forEach()/filter()/map()/reduce()/find()/findIndex()
        d. 函数对象的bind()
        e. Form.create()() / getFieldDecorator()()
    3). 高阶函数更新动态, 更加具有扩展性

2. 高阶组件
    1). 本质就是一个函数
    2). 接收一个组件(被包装组件), 返回一个新的组件(包装组件), 包装组件会向被包装组件传入特定属性
    3). 作用: 扩展组件的功能
    4). 高阶组件也是高阶函数: 接收一个组件函数, 返回是一个新的组件函数

 */
/*
    包装 Form 组件生成一个新的组件: Form(Login)
    新组件会向 Form 组件传递一个强大的对象属性: form
 */
const WrapLogin = Form.create()(Login);
export default WrapLogin;

/*
    1. 前台表单验证
    2. 收集表单输入数据
 */


/*
async - await

1. 作用?
   简化 promise 对象的使用: 不用再使用 then() 来指定成功/失败的回调函数
   以同步编码(没有回调函数了)方式实现异步流程

2. 哪里写await?
    在返回 promise 的表达式左侧写 await: 不想要 promise, 想要 promise 异步执行的成功的 value 数据

3. 哪里写async?
    await所在函数(最近的)定义的左侧写async

 */
