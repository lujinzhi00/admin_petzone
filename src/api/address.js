import request from "@/utils/request"
export function getAddressList(params) {
    return request({
        url: "address/index",
        method: "get",
        params
    })
}

export function delAddress(params) {
    return request({
        url: 'address/addressDel',
        method: 'post',
        data: params,
    })
}

export function addAddress(params) {
    return request({
        url: 'address/addressAdd',
        method: 'post',
        data: params,
    })
}

export function editAddress(params) {
    return request({
        url: 'address/addressEdit',
        method: 'post',
        data: params
    })
}
export function getDetail(params) {
    return request({
        url: 'address/getDetail',
        method: 'get',
        params
    })
}
