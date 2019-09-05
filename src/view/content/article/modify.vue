<template>
    <div class="container">
        <Row :gutter="16">
            <Form ref="temp" :model="temp" :rules="ruleValidate" :label-width="80">
                <Col span="16">
                    <Card :bordered="false" dis-hover>
                        <p slot="title">基本信息</p>
                        <FormItem label="标题" prop="title">
                            <Input v-model="temp.title" placeholder="输入标题" />
                        </FormItem>
                        <FormItem label="摘要">
                            <Input v-model="temp.summary" type="textarea" placeholder="摘要" />
                        </FormItem>
                        <FormItem label="缩略图">
                            <Upload :list="defaultFiles" v-if="showUpload" @onChange="e=>temp.thumbnail=e" />
                        </FormItem>
                        <FormItem label="内容">
                            <Editor :value="temp.content" :upload-img-params="uploadImgParams" @on-change="(e)=>this.temp.content=e"/>
                        </FormItem>
                    </Card>
                </Col>
                <Col span="8">
                    <Card :bordered="false" dis-hover>
                        <p slot="title">其他信息</p>
                        <FormItem label="文章类型" prop="article_type_id">
                            <Select v-model="temp.article_type_id">
                                <Option v-for="(item,index) in types" :value="item.id" :key="index">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                    </Card>
                </Col>
            </Form>
        </Row>
        <div class="submit-div">
            <Button type="primary" @click="handleSubmit('temp')">提交</Button>
            <Button @click="handleReset('temp')" style="margin-left: 8px">重置</Button>
        </div>
    </div>
</template>
<script>
import { list, create, update, info } from '@/api/base'
import Editor from '_c/editor'
import Upload from '_c/upload'
const rules = {
  title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
  articleType_id: [{ type: 'number', required: true, message: '请选择类型', trigger: 'change' }]
}
export default {
  components: {
    Editor, Upload
  },
  data () {
    return {
      model: 'article',
      temp: {},
      types: [],
      ruleValidate: rules,
      uploadImgParams: { businessType: 4, name: 'article' },
      defaultFiles: [],
      showUpload: false
    }
  },
  created () { this.initData() },
  methods: {
    async initData () {
      const result = await list('articletype', { pageSize: 100 })
      if (result.success) this.types = result.data.list
      if (this.$route.params.id) {
        const res = await info(this.model, this.$route.params.id)
        if (res.success) {
          this.temp = res.data
          if (res.data.thumbnail) this.defaultFiles = [{ url: res.data.thumbnail }]
        }
      }
      this.showUpload = true
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) this.save()
      })
    },
    async save () {
      const formData = this.temp
      const { id, ...vals } = formData
      if (id) {
        const res = await update(this.model, id, vals)
        if (!res.success) return this.$Message.error(res.errmsg)
        this.$Message.success('修改成功')
      } else {
        const res = await create(this.model, formData)
        if (!res.success) return this.$Message.error(res.errmsg)
        this.$Message.success('添加成功')
      }
      this.$router.push({ path: '/content/article' })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
