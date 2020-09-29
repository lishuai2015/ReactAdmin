/*
进行local数据存储管理的工具模块
 */
import store from 'store'

const USER_KEY = 'user_key'

export default {
    /**
     * 保存user
     *
     * @param user
     */
    saveUser(user) {
        // localStorage.setItem(USER_KEY, JSON.stringify(user)) 原生

        // localStorage 只能保存 string, 如果传递是对象, 会自动调用对象的 toString()并保存    [store.set() 内部会自动转换成 json 再保存]
        store.set(USER_KEY, user)
    },

    /**
     * 读取user
     * 如果存在, 需要返回的是对象, 如果没有值, 返回{}
     */
    getUser() {
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        return store.get(USER_KEY) || {}
    },

    /**
     * 删除user
     */
    removeUser() {
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    }

}