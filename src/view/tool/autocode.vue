<template>
    <div class="container" style="height:100%">
        <Card :bordered="false" dis-hover>
            <p slot="title">基本信息</p>
            <Form ref="temp" :model="temp" :rules="ruleValidate" :label-width="80" inline>
                <FormItem label="模块名" prop="moduleName">
                    <Input v-model="temp.moduleName" placeholder="输入模块名" />
                </FormItem>
                <FormItem label="类名" prop="className">
                    <Input v-model="temp.className" placeholder="输入类名" />
                </FormItem>
                 <FormItem label="数据模型" prop="modelName">
                    <Input v-model="temp.modelName" placeholder="用于请求数据的model" />
                </FormItem>
                <FormItem label="首页文件名" prop="indexName">
                    <Input v-model="temp.indexName" placeholder="输入文件名" />
                </FormItem>
                <FormItem label="开启权限" prop="openPower">
                    <Select v-model="temp.openPower" style="width:70px">
                        <Option :value=0>否</Option>
                        <Option :value=1>是</Option>
                    </Select>
                </FormItem>
                <FormItem label="开启多选" prop="selection">
                    <Select v-model="temp.selection" style="width:70px">
                        <Option :value=0>否</Option>
                        <Option :value=1>是</Option>
                    </Select>
                </FormItem>
                <FormItem label="操作使用Dropdown" prop="dropDown">
                    <Select v-model="temp.dropDown" style="width:70px">
                        <Option :value=0>否</Option>
                        <Option :value=1>是</Option>
                    </Select>
                </FormItem>
            </Form>
        </Card>
        <Card :bordered="false" dis-hover style="margin-bottom:50px">
            <p slot="title">字段信息</p>
            <p slot="extra"><Button @click="onAddField" type="primary" shape="circle" icon="md-add"></Button></p>
             <Form ref="fields" :label-width="65" inline>
                <div v-for="(item,index) in fields" :key="index">
                    <FormItem label="label" prop="label">
                        <Input v-model="item.label" placeholder="输入label"/>
                    </FormItem>
                    <FormItem label="字段名称" prop="field">
                        <Input v-model="item.field" placeholder="输入字段名" />
                    </FormItem>
                    <FormItem label="字段类型" prop="type">
                        <Select v-model="item.type" style="width:70px" @on-change="onTypeChange(item.type,index)">
                            <Option :value=1>文字</Option>
                            <Option :value=2>数字</Option>
                            <Option :value=3>单选</Option>
                            <Option :value=4>多选</Option>
                            <Option :value=5>下拉</Option>
                            <Option :value=6>日期</Option>
                            <Option :value=7>图片</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="默认值" prop="default">
                        <Input v-if="!item.isTextarea" v-model="item.default" :placeholder="item.placeholder" />
                        <Input v-else type="textarea" v-model="item.default" :placeholder="item.placeholder" />
                    </FormItem>
                    <FormItem label="必填" prop="required">
                        <Select v-model="item.required" style="width:70px">
                            <Option :value=0>否</Option>
                            <Option :value=1>是</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="标识" prop="mark">
                        <Select v-model="item.mark" style="width:70px">
                            <Option :value=1>主键</Option>
                            <Option :value=2>搜索</Option>
                            <Option :value=3>普通</Option>
                        </Select>
                    </FormItem>
                    <Button style="float:right" type="error" shape="circle" @click="onDelField(index)" icon="md-remove" />
                </div>
             </Form>
        </Card>
        <div class="submit-div" style="margin-top:20px;width:500px">
            <Button type="primary" @click="create()">生成到本地</Button>
            <Button @click="create(temp.indexName)" style="margin-left: 8px">生成首页</Button>
            <Button @click="create('modal.vue')" style="margin-left: 8px">生成modal</Button>
            <Button @click="handleReset" style="margin-left: 8px">重置</Button>
        </div>
        <Modal v-model="vaisible" :title="modalTitle" width="850" @on-cancel="vaisible=false">
          <pre v-highlightjs="code"><code class="javascript"></code></pre>
          <div slot="footer">
            <Button type="primary" @click="copyCode">复制代码</Button>
          </div>
        </Modal>
    </div>
</template>
<script>
import { createView } from '@/api/base'
const rules = {
  moduleName: [{ required: true, message: '模块不能为空', trigger: 'blur' }],
  modelName: [{ required: true, message: 'model不能为空', trigger: 'blur' }]
}
export default {
  data () {
    return {
      temp: { moduleName: 'content', className: 'student', modelName: 'student', indexName: 'index.vue' },
      fields: [{ label: 'ID', field: 'id', type: 2, required: 0, mark: 1 },// 主键
      { label: '姓名', field: 'name', placeholder:'请输入姓名', type: 1, required: 1, mark: 2 },
      { label: '性别', field: 'sex', type: 1, required: 0, mark: 3 },
      { label: '年龄', field: '', type: 1, required: 0, mark: 3 }
      ], 
      ruleValidate: rules,
      vaisible: false,
      modalTitle: '',
      code: ''
    }
  },
  methods: {
    onAddField () {
      this.fields.push({ type: 1, required: 0, placeholder: '请输入', mark: 3 })
    },
    onDelField (index) {
      this.fields.splice(index, 1)
    },
    onTypeChange (type, index) {
      let isTextarea = false
      let placeholder = '请输入' + (this.fields[index].label !== undefined ? this.fields[index].label : '')
      if (type > 2 && type < 6) {
        isTextarea = true
        placeholder = '多个选项，用‘-’隔开'
      }
      this.fields[index].isTextarea = isTextarea
      this.fields[index].placeholder = placeholder
    },
    create (name) {
      this.$refs['temp'].validate((valid) => {
        if (valid) this.save(name)
      })
    },
    async save (name) {
      if (this.fields.length === 0) return this.$Message.warning('至少一个字段')
      const result = await createView({ srcPath: process.env.VUE_APP_SRC, temp: this.temp, fields: this.fields, name: name })
      if (result.success) {
        if (name) {
          this.vaisible = true
          this.modalTitle = 'src/view/' + this.temp.moduleName + (this.temp.className ? '/' + this.temp.className : '') + '/' + name
          this.code = result.data
          return
        }
        this.$Message.success('生成成功，正在刷新页面')
      }
    },
    handleReset (name) {
      this.$refs['temp'].resetFields()
      this.fields = []
    },
    copyCode () {
      this.$copyText(this.code).then(
        res => {
          this.$Message.success('内容已复制到剪切板！')
        },
        err => {
          this.$Message.error('复制失败')
          console.log(err)
        })
    }
  }
}
</script>
<style>
  .ivu-form-inline .ivu-form-item{margin:5px 0}
</style>
