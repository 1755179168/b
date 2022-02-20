import request from '@/utils/request'

export async function login(userInfo) {
    return await request.post('/api/admin/login', userInfo);
}
// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }

export function getTx(token) {
    return request({
        url: '/vue-admin-template/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/vue-admin-template/user/logout',
        method: 'post'
    })
}