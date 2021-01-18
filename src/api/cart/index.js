import request from '../index'

// 请求已经添加到购物车的内容
function getHadAddCartGoods(data) {
    return request({
        url:"/cart/cartList",
        method:"get",
        data
    })
}

function deleteCartGood(data) {
    return request({
        url: "/cart/deleteAction",
        method: 'get',
        data
    })
}

function addShoppingCartRequest(data) {
    return request({
        url: "/cart/addCart",
        method: "post",
        data
    })
}
export {
    getHadAddCartGoods,
    deleteCartGood,
    addShoppingCartRequest
}