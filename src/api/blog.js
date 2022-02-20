import request from '@/utils/request'
/**
 * 添加分类
 * @returns 
 */
export function addType(data) {
    return request({
        url: '/api/blogType',
        method: 'post',
        data
    })
}
/**
 * 修改分类
 */
export function editType(data, id) {
    return request({
        url: '/api/blogtype/:' + id,
        method: 'put',
        data
    })
}
/**
 * 删除分类
 */
export function deleteType(data, id) {
    return request({
        url: '/api/blogtype/:' + id,
        method: 'delete',
        data
    })
}
/**
 * 获取分类
 */
export function getBlogType() {
    return request({
        url: '/api/blogtype/',
        method: 'get',
    })
}
/**
 * 发布文章
 */
export function releaseBlog(data) {
    return request({
        url: '/api/blog/',
        method: 'post',
        data
    })
}
/**
 * 修改文章
 */

export function editBlog(data, id) {
    return request({
        url: '/api/blog/:' + id,
        method: 'put',
        data
    })
}
/**
 * 删除文章
 */
export function deleteBlog(id) {
    return request({
        url: '/api/blog/:' + id,
        method: 'delete',
    })
}
/**
 * 分页获取文章
 */
export function getPageBlog(page = 1, limit = 10) {
    return request({
        url: '/api/blog/',
        method: 'get',
        params: {
            page,
            limit
        }
    })
}