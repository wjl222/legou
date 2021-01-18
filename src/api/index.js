import axios from 'axios'
import qs from 'qs'
import store from '@/store'

const instance = axios.create({
    // baseURL  公共接口路径
    baseURL: 'http://shop.bufantec.com/bufan',
    // timeout 超时时间
    timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
    config => {
        if (config.method.toLowerCase() == 'post') {
            // qs系列化
            // https://www.npmjs.com/package/qs
            //  arrayFormat: 'repeat' 作用:  { a: ['b', 'c'] }  ==> 'a=b&a=c'
            //  allowDots: true  作用: { a: { b: { c: 'd', e: 'f' } } }  ==>  'a.b.c=d&a.b.e=f'
            config.data = qs.stringify(config.data, {
                arrayFormat: 'repeat',
                allowDots: true
            })
        } else {
            // 
            config.params = config.data;
        }
        store.commit('showLoading')
        return config
    },
    error => {
        store.commit('hideLoading')
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// 响应拦截器  

instance.interceptors.response.use(

    response => {
        store.commit('hideLoading')
        const res = response.data
        return res
    },
    error => {
        store.commit('hideLoading')
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default instance