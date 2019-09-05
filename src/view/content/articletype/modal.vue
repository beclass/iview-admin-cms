<template>
  <Modal v-model="vaisible" :title="modalType" @on-cancel="vaisible=false">
    <Form ref="temp" :model="temp" :rules="ruleValidate" :label-width="50">
      <FormItem label="名称" prop="name">
        <Input v-model="temp.name" placeholder="请输入名称" />
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" size="large" @click="ok">确定</Button>
    </div>
  </Modal>
</template>
<script>
const rules = {
  name: [{ required: true, message: '名称不能为空', trigger: 'blur' }]
}
export default {
  props: {
    modalType: { type: String, default: '添加' },
    temp: { type: Object, default: () => ({}) }
  },
  data () {
    return {
      vaisible: false,
      ruleValidate: rules
    }
  },
  methods: {
    isShow (v) { this.vaisible = v },
    ok () {
      this.$refs['temp'].validate((valid) => {
        if (!valid) return
        this.$emit('onOK', this.temp)
      })
    }
  }
}
</script>
