import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = getToken();
    const getUserName = store.getters.name;
    if (to.meta.auth) {
        if (getUserName) {
            next();
        } else {
            if (hasToken) {
                //验证token是否有效
                try {
                    await store.dispatch('user/getInfo');
                    next();
                    NProgress.done();
                } catch {
                    await store.dispatch('user/resetToken');
                    Message.error("登录过期，请重新登陆");
                    next(`/login?redirect=${to.path}`);
                    NProgress.done();
                }
            } else {
                next(`/login?redirect=${to.path}`);
                NProgress.done();
            }
        }
        NProgress.done();
    } else {
        //无需鉴权
        if (to.path === '/login') {
            if (getUserName) {
                next('/');
            } else {
                next();
                NProgress.done();
            }
        } else {
            next();
        }
        NProgress.done();
    }
    // if (hasToken) {
    //     if (to.path === '/login') {
    //         // if is logged in, redirect to the home page
    //         next({ path: '/' })
    //         NProgress.done()
    //     } else {
    //         const hasGetUserInfo = store.getters.name
    //         if (hasGetUserInfo) {
    //             next()
    //         } else {
    //             try {
    //                 // get user info
    //                 await store.dispatch('user/getInfo')

    //                 next()
    //             } catch (error) {
    //                 // remove token and go to login page to re-login
    //                 await store.dispatch('user/resetToken')
    //                 Message.error(error || 'Has Error')
    // next(`/login?redirect=${to.path}`)
    //                 NProgress.done()
    //             }
    //         }
    //     }
    // } else {
    //     /* has no token*/

    //     if (!to.meta.auth) {
    //         // in the free login whitelist, go directly
    //         next()
    //     } else {
    //         // other pages that do not have permission to access are redirected to the login page.
    //         next(`/login?redirect=${to.path}`)
    //         NProgress.done()
    //     }
    // }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})