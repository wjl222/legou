import request from '../index'

// 根据id请求商品
function getCategoryList(data) {
    return request({
        url:"/category/currentaction",
        method:"get",
        data
    })
}

// 根据id请求分类nav
function getCategoryNav(data) {
    return request({
        url:"/category/categoryNav",
        method:"get",
        data
    })
}

export {
    getCategoryList,
    getCategoryNav
}