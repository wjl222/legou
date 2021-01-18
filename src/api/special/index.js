import request from '../index'

// 根据id请求商品
function getSpecialList(data) {
    return request({
        url:"/topic/listaction",
        method:"get",
        data
    })
}

export {
    getSpecialList
}