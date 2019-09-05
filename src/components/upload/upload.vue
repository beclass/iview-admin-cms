<template>
  <div>
    <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :on-success="handleSuccess"
      :on-error="handleFail"
      :format="['jpg','jpeg','png']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      :multiple="multiple"
      name="upload_file"
      type="drag"
      :action="action"
      :default-file-list="list"
      style="display: inline-block;width:58px;">
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="预览" v-model="visible" footor>
      <img :src="imgUrl" v-if="visible" style="width: 100%">
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
// import { removeFile } from '@/api/base'
export default {
  props: {
    multiple: { type: Boolean, default: false },
    max: { type: Number, default: 1 },
    list: { type: Array, default: () => ([]) }
  },
  data () {
    return {
      action: process.env.VUE_APP_UPLOAD_URL,
      imgUrl: '',
      visible: false,
      uploadList: []
    }
  },
  methods: {
    handleView (url) {
      this.imgUrl = url
      this.visible = true
    },
    async handleRemove (file) {
      // const res = await removeFile({ids:[file.response.data.id]})
      // if(res.success){
      //     const fileList = this.$refs.upload.fileList;
      //     this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      // }
      this.$refs.upload.fileList.splice(this.$refs.upload.fileList.indexOf(file), 1)
      this.$emit('onChange', null)
    },
    handleSuccess (res, file) {
      if (!res.success) return this.$Notice.error({ title: '上传失败', desc: res.errmsg })
      file.url = res.data.filePath
      file.name = res.data.name
      this.$emit('onChange', file.url)
    },
    handleFail (error, file) {
      this.$Notice.error({ title: '上传失败', desc: error })
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '不支持该文件类型',
        desc: '文件' + file.name + '格式不正确，请选择JPG或PNG'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '文件  ' + file.name + ' 太大，不能超过2M'
      })
    },
    handleBeforeUpload (file) {
      const check = this.uploadList.length < this.max
      if (!check) this.$Notice.warning({ title: '最多可以上传' + this.max + '张图片' })
      return check
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  }
}
</script>
<style>
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
