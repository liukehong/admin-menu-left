import Vue from 'vue'
import Router from 'vue-router'
/* 首页 */
import Home from '@/components/Home'
/* 登陆 */
import Login from '@/components/Login'
/* 框 */
import Main from '@/components/Main'
/* 三级菜单空白框 */
import Box from '@/components/Box'
/* ======================= 组件 ============================ */
// 数字渐变
import CONUT_TO from '@/components/component/count-to/CountTo'
/* ======================= 表格 ============================ */
// 基本表格
import BASE_TABLE from '@/components/tables/base-table'
// 可编辑表格
import EDITABLE_TABLE from '@/components/tables/editable-table'
// 测试三级菜单
import TEST from '@/components/tables/test'


Vue.use(Router)
/* 登录页 */
const LoginPage = {
  path: '/login',
  name: 'login',
  component: Login
}
/* 左侧菜单 */
const menuRouter = [
  {
    path: '/component',
    name: '组件',
    title: '组件',
    component: Main,
    children: [
      {
        path: '/component/count-to',
        name: '数字渐变',
        title: '数字渐变',
        component: CONUT_TO,
        meta:{
          type: '菜单',
          name: '数字渐变'
        }
      }
    ]
  },
  {
    path: '/tables',
    name: '表格',
    title: '表格',
    component: Main,
    children: [
      {
        path: '/tables/base-table',
        name: '基本表格',
        title: '基本表格',
        component: BASE_TABLE,
        meta: {
          type: '菜单',
          name: '基本表格'
        }
      },
      {
        path: '/tables/editable-table',
        name: '可编辑表格',
        title: '可编辑表格',
        component: EDITABLE_TABLE,
        meta: {
          type: '菜单',
          name: '可编辑表格'
        }
      },
      {
        path: '/tables/test',
        name: '测试',
        title: '测试',
        component: Box,
        children: [
          {
            path: '/tables/test/children',
            name: '测试子页面',
            title: '测试子页面',
            component: TEST,
            meta: {
              type: '菜单',
              name: '测试子页面'
            }
          }
        ]
      }
    ]
  }
]
/* 非左侧菜单 */
const otherRouter = {
  path: '/',
  name: 'otherRouter',
  component: Main,
  children: [
    { path: 'home',title: '首页',name: '首页',component: Home,meta: {type:"菜单",name:"首页"} },
  ]
}
export default new Router({
  //mode: 'history', //切换路径模式，变成history模式
  scrollBehavior: () => ({ y: 0 }), // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
  routes: [
    LoginPage,
    otherRouter,
    ...menuRouter
  ]
})