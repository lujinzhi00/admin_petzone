import request from "@/utils/request"
export function getServList(params) {
    return request({
        url: "serv/index",
        method: "get",
        params
    })
}

export function delServ(params) {
    return request({
        url: 'serv/servDel',
        method: 'post',
        data: params,
    })
}

export function getAddress() {
    return request({
        url: 'serv/servAdd',
        method: 'get',
    })
}
export function addServ(params) {
    return request({
        url: 'serv/servAdd',
        method: 'post',
        data: params,
    })
}

export function editServ(params) {
    return request({
        url: 'serv/servEdit',
        method: 'post',
        data: params
    })
}
export function getServ(params) {
    return request({
        url: '/serv/getServDetail',
        method: 'get',
        params
    })
}
