import request from "@/utils/request"

// 推荐位相关
export function getBanner() {
    return request({
        url: "banner/index"
    })
}

export function addBanner(params) {
    return request({
        url: "banner/addBanner",
        method: "post",
        data: params
    })
}

export function editBanner(params) {
    return request({
        url: "banner/editBanner",
        method: "post",
        data: params
    })
}

export function delBanner(params) {
    return request({
        url: "banner/delBanner",
        method: "post",
        data: params
    })
}
export function chaBanner(params) {
    return request({
        url: "banner/changeBanner",
        method: "post",
        data: params
    })
}

// 推荐位内容相关
export function bannerItem(params) {
    return request({
        url: "banner/content",
        method: "get",
        params
    })
}

export function addBannerItem(params) {
    return request({
        url: "banner/addBannerItem",
        method: "post",
        data: params
    })
}

export function editBannerItem(params) {
    return request({
        url: "banner/editBannerItem",
        method: "post",
        data: params
    })
}

export function delBannerItem(params) {
    return request({
        url: "banner/delBannerItem",
        method: "post",
        data: params
    })
}
