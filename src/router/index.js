import Vue from "vue"
import Router from "vue-router"
/* Layout */
import Layout from "../views/layout/Layout"

// 在开发环境中不使用延迟加载，因为延迟加载太多页面会导致webpack热更新太慢。 所以只有在生产中使用延迟加载;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)
/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (banner set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
    {
        path: "/login",
        component: () => import("@/views/login/index"),
        hidden: true
    },
    {
        path: "/404",
        component: () => import("@/views/404"),
        hidden: true
    },
    {
        path: "",
        component: Layout,
        redirect: "dashboard",
        name: "dashboard",
        children: [
            {
                path: "dashboard",
                name: "index",
                component: () => import("@/views/dashboard/index"),
                meta: { title: "首页", icon: "table" }
            }
        ]
    },
    {
        path: "/admin",
        component: Layout,
        name: "admin",
        redirect: "/admin/user",
        meta: { title: "后台管理", icon: "admin-manage" },
        children: [
            {
                path: "user",
                name: "admin-user",
                component: () => import("@/views/admin/user/index"),
                meta: { title: "后台用户列表" }
            },
            {
                path: "addAdmin",
                name: "add-admin",
                component: () => import("@/views/admin/user/addUser"),
                meta: { title: "添加管理员" },
                hidden: true
            },
            {
                path: "role",
                name: "admin-role",
                component: () => import("@/views/admin/role/index"),
                meta: { title: "角色管理" }
            },
            {
                path: "node",
                name: "admin-node",
                component: () => import("@/views/admin/node/index"),
                meta: { title: "节点管理" }
            }
        ]
    },
    {
        path: "/serv",
        name: "serv",
        component: Layout,
        alwaysShow: true,
        redirect: "/serv/index",
        meta: { title: "服务管理", icon: "system" },
        children: [
            {
                path: "index",
                name: "serv-list",
                component: () => import("@/views/serv/index"),
                meta: { title: "服务列表" },
            },
            {
			    path: "addServ",
			    name: "add-serv",
			    component: () => import("@/views/serv/addServ"),
			    meta: { title: "添加服务" },
			    hidden: true
            },
            {
			    path: "editServ",
			    name: "edit-serv",
			    component: () => import("@/views/serv/editServ"),
			    meta: { title: "修改服务" },
			    hidden: true
            }
        ]
    },
    {
        path: "/address",
        name: "address",
        component: Layout,
        alwaysShow: true,
        redirect: "/address/index",
        meta: { title: "地址管理", icon: "eye" },
        children: [
            {
                path: "index",
                name: "address-list",
                component: () => import("@/views/address/index"),
                meta: { title: "地址列表" },
            },
            {
			    path: "addAddress",
			    name: "add-address",
			    component: () => import("@/views/address/addAddress"),
			    meta: { title: "添加地址" },
			    hidden: true
            },
            {
			    path: "editAddress",
			    name: "edit-address",
			    component: () => import("@/views/address/editAddress"),
			    meta: { title: "修改地址" },
			    hidden: true
            }
        ]
    },
    {
        path: "/mission",
        name: "mission",
        component: Layout,
        alwaysShow: true,
        redirect: "/mission/index",
        meta: { title: "任务管理", icon: "product" },
        children: [
            {
                path: "check",
                name: "mission-list",
                component: () => import("@/views/mission/check/index"),
                meta: { title: "审核列表" }
            },
            {
                path: "list",
                name: "mission-check",
                component: () => import("@/views/mission/list/index"),
                meta: { title: "任务列表" }
            },
        ]
    },
    {
        path: "/user",
        name: "user",
        component: Layout,
        alwaysShow: true,
        redirect: "/user/index",
        meta: { title: "会员管理", icon: "member" },
        children: [
            {
                path: "index",
                name: "user-index",
                component: () => import("@/views/user/index"),
                meta: { title: "会员列表" },
            },
        ]
    },
    {
        path: "/activity",
        name: "activity",
        component: Layout,
        alwaysShow: true,
        redirect: "/activity/index",
        meta: { title: "活动管理", icon: "node" },
        children: [
            {
                path: "index",
                name: "activity-list",
                component: () => import("@/views/activity/index"),
                meta: { title: "活动列表" }
            },

            {
                path: "addActivity",
                name: "Activity-add",
                component: () => import("@/views/activity/addActivity"),
                meta: { title: "添加活动" },
                hidden: true
            },
            {
                path: "editActivity",
                name: "Activity-edit",
                component: () => import("@/views/activity/editActivity"),
                meta: { title: "修改活动" },
                hidden: true
            }
        ]
    },
    {
        path: "/order",
        name: "order",
        component: Layout,
        alwaysShow: true,
        redirect: "/order/list",
        meta: { title: "订单管理", icon: "order" },
        children: [
            {
                path: "list",
                name: "order-list",
                component: () => import("@/views/order/list/index"),
                meta: { title: "订单列表" }
            },
            {
                path: "deal",
                name: "order-deal",
                component: () => import("@/views/order/deal/index"),
                meta: { title: "处理列表" }
            },
        ]
    },
    {
        path: "/banner",
        name: "banner",
        component: Layout,
        alwaysShow: true,
        redirect: "/banner/index",
        meta: { title: "推荐管理", icon: "recommend" },
        children: [
            {
                path: "index",
                name: "banner-list",
                component: () => import("@/views/banner/postion/index"),
                meta: { title: "轮播记录管理" }
            },
            {
                path: "content",
                name: "banner-content",
                component: () => import("@/views/banner/content/index"),
                meta: { title: "轮播内容管理" }
            },
            {
                path: "comment",
                name: "comment-index",
                component: () => import("@/views/banner/comment/index"),
                meta: { title: "精选管理" }
            }
        ]
    },
    { path: "*", redirect: "/404", hidden: true }
]

export default new Router({
    // mode: 'history', //后端支持可开
    // base: '/root/',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})
