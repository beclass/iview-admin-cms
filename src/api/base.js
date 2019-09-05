/*
 * @Desc: 基础api
 * @Author: lwp
 * @Date: 2019-09-04 18:43:19
 * @LastEditors: lwp
 * @LastEditTime: 2019-09-05 11:08:04
 */
import axios from '@/libs/api.request'
const list = (model, query) => {
  return axios.request({
    url: `/${model}`,
    method: 'get',
    params: query
  })
}
const info = (model, id) => {
  return axios.request({
    url: `/${model}/${id}`,
    method: 'get'
  })
}
const create = (model, data) => {
  return axios.request({
    url: '/' + model,
    data: data,
    method: 'post'
  })
}
const update = (model, id, data) => {
  return axios.request({
    url: `/${model}/${id}`,
    data: data,
    method: 'put'
  })
}
const remove = (model, ids) => {
  return axios.request({
    url: `/${model}`,
    data: { ids: ids },
    method: 'delete'
  })
}
const cmdFun = (model, cmd, params, method) => {
  let obj = {
    url: `/${model}/cmd/${cmd}`,
    data: params,
    method: method || 'get'
  }
  if (obj.method === 'get') {
    obj.params = params
  } else {
    obj.data = params
  }
  return axios.request(obj)
}
const upload = (formData) => {
  return axios.request({
    url: '/file/upload',
    data: formData,
    method: 'post'
  })
}
const removeFile = (params) => {
  return axios.request({
    url: '/file',
    data: params,
    method: 'delete',
    ext: 'api'
  })
}
const createView = (params) => {
  return axios.request({
    url: '/util/create/view',
    data: params,
    method: 'post'
  })
}
export {
  list, info, create, update, remove, cmdFun, upload, removeFile, createView
}
