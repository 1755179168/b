import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            meta: { title: '控制台', icon: 'dashboard', auth: true }
        }]
    },
    {
        path: '/index',
        component: Layout,
        redirect: '/index/banner',
        children: [{
            path: 'banner',
            name: 'Banner',
            component: () =>
                import ('@/views/banner/index.vue'),
            meta: {
                title: '首页标语',
                icon: 'el-icon-s-home',
                auth: true
            }
        }]
    },
    {
        path: '/blogAdmin',
        component: Layout,
        redirect: '/blogAdmin/blogList',
        name: 'BlogAdmin',
        meta: { title: '文章管理', icon: 'el-icon-document', },
        children: [{
                path: 'blogList',
                name: 'BlogList',
                component: () =>
                    import ('@/views/blog-list/index'),
                meta: { title: '文章列表', icon: 'el-icon-folder-opened', auth: true }
            },
            {
                path: 'addList',
                name: 'AddList',
                component: () =>
                    import ('@/views/addlist/index'),
                meta: { title: '添加文章', icon: 'el-icon-edit', auth: true }
            }, {
                path: 'blogCategory',
                name: 'blogCategory',
                component: () =>
                    import ('@/views/blog-category/index'),
                meta: { title: '文章分类', icon: 'el-icon-menu', auth: true }
            }
        ]
    },


    {
        path: '/project',
        component: Layout,
        meta: {
            title: '项目管理',
            icon: 'el-icon-folder',
        },
        children: [{
            path: '/projectList',
            name: 'ProjectList',
            component: () =>
                import ('@/views/myProject/project-list/index.vue'),
            meta: {
                title: '项目列表',
                icon: 'el-icon-notebook-2',
                auth: true
            }
        }, {
            path: 'projectAdd',
            name: 'ProjectAdd',
            component: () =>
                import ('@/views/myProject/project-add/index.vue'),
            meta: {
                title: '添加项目',
                icon: 'el-icon-folder-add',
                auth: true
            }
        }]
    },

    {
        path: '/comment',
        component: Layout,
        redirect: '/comment/commentAdmin',
        children: [{
            name: 'CommentAdmin',
            path: '/commentAdmin',
            component: () =>
                import ('@/views/comment/index.vue'),
            meta: {
                title: '评论管理',
                icon: 'el-icon-position',
                auth: true
            },
        }]
    },
    {
        path: '/message',
        redirect: '/message/messageBord',
        component: Layout,
        children: [{
            name: 'messageBord',
            path: '/messageBord',
            component: () =>
                import ('@/views/message/index'),
            meta: {
                title: '留言板',
                icon: 'el-icon-document-copy',
                auth: true
            }
        }]
    },
    {
        path: '/about',
        component: Layout,
        redirect: '/about/aboutocument',
        children: [{
            name: 'Aboutocument',
            path: '/aboutocument',
            component: () =>
                import ('@/views/about/index.vue'),
            meta: {
                title: '关于我',
                icon: 'el-icon-user',
                auth: true
            },
        }]
    },
    {
        path: '/setting',
        component: Layout,
        redirect: '/setting/settingwz',
        children: [{
            name: 'settingwz',
            path: '/settingwz',
            component: () =>
                import ('@/views/set/index.vue'),
            meta: {
                title: '设置',
                icon: 'el-icon-setting',
                auth: true
            },
        }]
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router