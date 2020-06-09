import request from '@/utils/request'
export function getActivityList(params) {
    return request({
        url: 'activity/index',
        method: 'get',
        params,
    })
}
export function addActivity(params) {
    return request({
        url: 'activity/activityAdd',
        method: 'post',
        data: params,
    })
}

export function getAddress() {
    return request({
        url: 'activity/activityAdd',
        method: 'get'
    })
}

export function delActivity(params) {
    return request({
        url: 'activity/activityDel',
        method: 'post',
        data: params,
    })
}

export function editActivity(params) {
    return request({
        url: 'activity/acitivityEdit',
        method: 'post',
        data: params
    })
}

export function changeActivity(params) {
    return request({
        url: 'activity/activityChange',
        method: 'post',
        data: params
    })
}

export function getActivity(params) {
    return request({
        url: 'activity/getActivityDetail',
        method: 'get',
        params
    })
}