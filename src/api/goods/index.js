import request from '../index'

// 根据id请求商品
function getGoodForId(data) {
    return request({
        url: "/goods/detailaction",
        method: "get",
        data
    })
}

// 发送收藏请求
function collectGoodRequest(data) {
    return request({
        url: "/collect/addcollect",
        method: "post",
        data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
    })
}

export {
    getGoodForId,
    collectGoodRequest
}