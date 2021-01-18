import request from '../index'

// 所有数据
function index(data) {
    return request({
        url:"/index/index",
        method:"get",
        data
    })
}

// 分类列表
function categoryIndexaction(data) {
    return request({
        url: "/category/indexaction",
        method: 'get',
        data
    })
}

// 根据id获取分类的商品数据
function getGoodList(data) {
    return request({
        url: '/goods/goodsList',
        method: 'get',
        data
    })
}

// 获取制造商详情
function getBrandDetail(data) {
    return request({
        url: '/brand/detailaction',
        method: 'get',
        data
    })
}

// 获取首页新品首发与人气推荐
function getNewAndRecommendProduct(data) {
    return request({
        url: '/goods/goodsList',
        method:'get',
        data
    })
}

// 专题精选数据请求
function getProjectSelection(data) {
    return request({
        url: '',
        method: 'get',
        data
    })
    
}

// 请求关键词和搜索
function getKeywordsHistorySearch(data) {
    return request({
        url: '/search/indexaction',
        method: 'get',
        data
    })
}
// 请求搜索关键词
function getSearchKeywordList(data) {
    return request({
        url: '/search/helperaction',
        method: 'get',
        data
    })
}

// 清除历史搜索
function clearHistorySearch(data) {
    return request({
        url: '/search/clearhistoryAction',
        method: 'post',
        data
    })
}

// 保存搜索的数据
function saveHistorySearch(data) {
    return request({
        url: '/search/addhistoryaction',
        method: 'post',
        data
    })
}

export {
    index,
    categoryIndexaction,
    getGoodList,
    getBrandDetail,
    getNewAndRecommendProduct,
    getKeywordsHistorySearch,
    getSearchKeywordList,
    clearHistorySearch,
    saveHistorySearch
}