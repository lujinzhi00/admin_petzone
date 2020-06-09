import request from "@/utils/request"

export function login(admin_name, password) {
    return request({
        url: "/login/doLogin",
        method: "post",
        data: {
            admin_name,
            password
        }
    })
}

export function getInfo() {
    return request({
        url: "/index/user",
        method: "get"
    })
}

export function logout() {
    return request({
        url: "/login/logout",
        method: "post"
    })
}
