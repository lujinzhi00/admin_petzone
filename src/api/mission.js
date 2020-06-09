import request from '@/utils/request'
export function getMissionList(params) {
    return request({
        url: 'mission/index',
        method: 'get',
        params,
    })
}
export function getCheckList(params) {
    return request({
        url: 'mission/checklist',
        method: 'get',
        params,
    })
}
export function delmission(params) {
    return request({
        url: 'mission/missiondel',
        method: 'post',
        data: params,
    })
}

export function change(data) {
    return request({
        url: 'mission/missionCheck',
        method: 'post',
        data
    })
}