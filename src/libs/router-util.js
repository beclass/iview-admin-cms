/**
 * 定义初始化菜单
 */
import { getToken, localSave, localRead } from '@/libs/util'
import { lazyLoadingCop } from '@/libs/tools'
import { getMenus } from '@/api/user'
import Main from '@/components/main'
import parentView from '@/components/parent-view'
import store from '@/store'
let gotRouter
// 初始化路由
export const initRouter = () => {
  if (!getToken()) return
  let routerData
  if (!gotRouter) {
    getMenus().then(res => {
      routerData = res
      localSave('dynamicRouter', JSON.stringify(routerData)) // 存储路由到localStorage
      gotRouter = filterAsyncRouter(routerData) // 过滤路由,路由组件转换
      store.commit('updateMenuList', gotRouter)
      dynamicRouterAdd()
    })
  } else {
    gotRouter = dynamicRouterAdd()
  }
  return gotRouter
}
// 加载路由菜单,从localStorage拿到路由,在创建路由时使用
export const dynamicRouterAdd = () => {
  let dynamicRouter = []
  let data = localRead('dynamicRouter')
  if (!data) {
    return dynamicRouter
  }
  dynamicRouter = filterAsyncRouter(JSON.parse(data))
  return dynamicRouter
}
// @函数: 遍历后台传来的路由字符串，转换为组件对象
export const filterAsyncRouter = asyncRouterMap => {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Main') {
        // Main组件特殊处理
        route.component = Main
      } else if (route.component === 'parentView') {
        // parentView组件特殊处理
        route.component = parentView
      } else {
        route.component = lazyLoadingCop(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
  return accessedRouters
}
