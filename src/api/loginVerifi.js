import request from '@/utils/request'
/**
 * 获取图片验证码
 * @returns 请求结果
 */
export function loginVerifi() {
    return request({
        url: '/res/captcha',
        method: 'get',
    })
}
/**
 * 验证用户输入的信息
 */
export async function login(userInfo) {
    return await request.post('/api/admin/login', userInfo);
}

export function whoami() {
    return request.get('/api/admin/whoami');
}