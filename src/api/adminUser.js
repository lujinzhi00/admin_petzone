import request from '@/utils/request'
export function getAdminList(params) {
    return request({
        url: 'admin/index',
        method: 'get',
        params,
    })
}
export function delAdmin(params) {
    return request({
        url: 'admin/adminDel',
        method: 'post',
        data: params,
    })
}

export function getRegAdminInfo() {
    return request({
        url: 'admin/adminAdd',
        method: 'get',
    })
}

export function regAdmin(params) {
    const url = params.id ? 'admin/adminEdit' : 'admin/adminAdd'
    return request({
        url: url,
        method: 'post',
        data: params
    })
}