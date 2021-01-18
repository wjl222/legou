import request from '../index'

// 根据id请求收藏商品
function addCollectGood(data) {
    return request({
        url:"/collect/addcollect",
        method:"post",
        data
    })
}
// 请求收藏的商品
function requestCollecList(data) {
    return request({
        url:"/collect/listAction",
        method:"get",
        data
    })
}
//添加地址
function addAddress(data) {
    return request({
        url: '/address/saveAction',
        method: "post",
        data
    })
}
// 获取地址
function getAddressList(data) {
    return request({
        url: '/address/getListAction',
        method: 'get',
        data
    })
}

export {
    addCollectGood,
    requestCollecList,
    addAddress,
    getAddressList
}