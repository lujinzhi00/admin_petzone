import request from '@/utils/request'
export function getCommentList(params) {
    return request({
        url: 'comment/index',
        params: params
    })
}

export function commentChange(params) {
    return request({
        url: 'comment/commentCheck',
        params: params
    })
}

