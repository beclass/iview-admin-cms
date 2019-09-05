<template>
    <div :id="editorId"></div>
</template>
<script>
import Editor from 'wangeditor'
import 'wangeditor/release/wangEditor.min.css'
import { oneOf } from '@/libs/tools'
import { getToken } from '@/libs/util'
export default {
  name: 'Editor', 
  props: {
    value: { type: String, default: '' }, 
    uploadImgParams: { type: Object, default: () => ({}) }, 
    /**
     * 绑定的值的类型, enum: ['html', 'text']
     */
    valueType: {
      type: String,
      default: 'html',
      validator: (val) => {
        return oneOf(val, ['html', 'text'])
      }
    },
    /**
     * @description 设置change事件触发时间间隔
     */
    changeInterval: {
      type: Number,
      default: 200
    },
    /**
     * @description 是否开启本地存储
     */
    cache: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    editorId () {
      return `editor${this._uid}`
    }
  },
  methods: {

  },
  watch: {
    value: function (val) {
      this.editor.txt.html(val)
    }
  },
  mounted () {
    this.editor = new Editor(`#${this.editorId}`)
    this.editor.customConfig.uploadImgServer = process.env.VUE_APP_UPLOAD_URL
    this.editor.customConfig.uploadFileName = 'upload_file'
    this.editor.customConfig.zIndex = 1
    this.editor.customConfig.uploadImgTimeout = 5000 // 超时时间 5s
    this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024 // 2M
    this.editor.customConfig.uploadImgParams = this.uploadImgParams
    this.editor.customConfig.uploadImgHeaders = {
      'Accept': 'text/x-json',
      'Authorization': 'Bearer ' + getToken()
    }
    this.editor.customConfig.customAlert = (info) => {
      this.$Notice.error({ title: '上传失败', desc: info })
    }
    this.editor.customConfig.uploadImgHooks = {
      customInsert: (insertImg, result, editor) => {
        if (!result.success) return this.$Notice.error({ title: '上传失败', desc: result.errmsg })
        insertImg(result.data.filePath)
      }
    }
    this.editor.customConfig.onchange = (html) => {
      // let text = this.editor.txt.text()
      // if (this.cache) localStorage.editorCache = html
      // this.$emit('input', this.valueType === 'html' ? html : text)
      this.$emit('on-change', html)
    }
    this.editor.customConfig.onchangeTimeout = this.changeInterval
    // create这个方法一定要在所有配置项之后调用
    this.editor.create()
    // 如果本地有存储加载本地存储内容
    // let html = this.value || localStorage.editorCache
    this.editor.txt.html(this.value)
  }
}
</script>
