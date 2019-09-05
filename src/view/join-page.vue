<template>
  <div>
    <Row :gutter="20">
      <i-col span="24">
        <Card title="fsadmin-cms   简化繁琐重复的工作" shadow>
          <img class="qq-group-img" :src="qqFans" alt="">
          <p class="qq-group-intro">
            本群为使用fsadmin-cms，iview-admin，vue，react，小程序，nodejs，php，java，go等全栈开发者提供交流平台，在这里共同进步
          </p>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import qqFans from '@/assets/images/qq-group.jpg'
export default {
  name: 'join_page',
  data () {
    return {
      qqFans
    }
  }
}
</script>
<style>
.qq-group-img{
  display: block;
  margin: 0 auto;
  width: 240px;
}
.qq-group-intro{
  padding: 20px;
  font-size: 16px;
}
</style>
