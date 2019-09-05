<style lang="less">
  @import './login.less';
</style>
<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">fsadmin-cms@2019</p>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin'
    ]),
    async handleSubmit ({ username, password }) {
      const result = await this.handleLogin({ username, password })
      if (result) {
        this.$router.push({
          name: this.$config.homeName
        })
      }
    }
  }
}
</script>
<style>
</style>
