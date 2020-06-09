import request from '@/utils/request'
export function getOrderList(params) {
    return request({
        url: 'order/index',
        method: 'get',
        params,
    })
}

export function getDealList(params) {
    return request({
        url: 'order/dealIndex',
        method: 'get',
        params,
    })
}
export function delOrder(params) {
    return request({
        url: 'Order/orderDel',
        method: 'post',
        data: params,
    })
}

export function changeOrder(params) {
    return request({
        url: 'order/orderChange',
        method: 'post',
        data: params
    })
}

export function outOrder(params) {
    return request({
        url: 'order/orderOut',
        method: 'post',
        data: params
    })
}

