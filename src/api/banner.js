import request from '@/utils/request'
/**
 * 获取标语
 * @returns 请求结果
 */
export function getBanner() {
    return request({
        url: '/api/banner',
        method: 'get',
    })
}
/**
 * 设置标语
 */

export function setBanner(data) {
    return request.post('/api/banner', data);
}