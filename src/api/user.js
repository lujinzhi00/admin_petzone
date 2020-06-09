import request from '@/utils/request'
export function getUserList(params) {
    return request({
        url: 'user/index',
        params: params
    })
}

export function editUser(params) {
    return request({
        url: 'user/editUser',
        data: params,
        method: 'post'
    })
}

