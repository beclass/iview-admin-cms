<template>
  <Modal v-model="vaisible" :title="temp.id?'修改':'添加'" @on-cancel="vaisible=false">
    <Form ref="temp" :model="temp" :rules="ruleValidate" :label-width="50">
      <FormItem label="姓名"  prop="name">
        <Input v-model="temp.name" placeholder="请输入"/>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" size="large" @click="ok">确定</Button>
    </div>
  </Modal>
</template>
<script>
const rules={
  name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
}
export default {
  props: {
    temp: {type: Object, default: {}},
  },
  data () {
    return {
      vaisible: false,
      ruleValidate: rules
    }
  },
  methods: {
    isShow(v){ this.vaisible = v },
    ok(){
      this.$refs["temp"].validate((valid) => {
        if (!valid) return
        this.$emit("onOK",this.temp)
      })
    },
  }
}
</script>