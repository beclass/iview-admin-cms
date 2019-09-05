import axios from 'axios'
import store from '@/store'
import { Message } from 'iview'
import { getToken } from '@/libs/util'
class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl + '/sys'
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        Author: 'lwp',
        Authorization: 'Bearer ' + getToken()
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { success, errcode } = res.data
      if (typeof (errcode) !== 'undefined' && !success) {
        Message.error(res.data.errmsg)
        if (errcode === 401) {
          return store.dispatch('handleLogOut')
        }
        return false
      }
      return res.data
    }, error => {
      Message.error('网络连接失败，请检查网络状态和系统代理设置')
      console.log(error)
    })
  }
  request (options) {
    const instance = axios.create()
    let config = this.getInsideConfig()
    if (options.ext) {
      config.baseURL = config.baseURL.replace('sys', options.ext)
      delete options.ext
    }
    options = Object.assign(config, options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
