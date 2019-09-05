<template>
  <Modal v-model="vaisible" :title="temp.id?'修改':'添加'" @on-cancel="vaisible=false">
    <Form ref="temp" :model="temp" :rules="ruleValidate" :label-width="50">
      <FormItem label="ip">
        <Input v-model="temp.ip" placeholder="请输入"/>
      </FormItem>
      <FormItem label="类型">
        <RadioGroup v-model="temp.type">
          <Radio label="0">登录</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="时间">
        <DatePicker type="date" v-model="temp.time" placeholder="请输入时间"/>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" size="large" @click="ok">确定</Button>
    </div>
  </Modal>
</template>
<script>
const rules={
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