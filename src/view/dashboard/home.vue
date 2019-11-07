<template>
  <div>
    <Card>
      <div class="coupon-items">
        <div class="pc-coupon-item">
          <div class="item-left">
            <div class="coupon-item-title">
              最高￥<span class="big-coupon-title">2000</span>
              红包<div class="coupon-label">限量</div>
            </div>
            <div class="coupon-item-desc">云产品通用，可叠加官网常规优惠使用  |  限时领取</div>
          </div>
          <a class="coupon-btn" href="https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=mpd2xfug" target="_blank">立即领取</a>
        </div>
        <div class="coupon-activity-img">
          <a href="https://dwz.cn/e8atY6gf" target="_blank">
          <img src="http://pic.loveyh.com/limit-buy.jpg" width="280" height="118"></a>
        </div>
      </div>
    </Card>
    <Row :gutter="20" style="margin-top:10px">
      <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="用户访问来源"></chart-pie>
        </Card>
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="每周用户活跃量"/>
        </Card>
      </i-col>
    </Row>
    <!-- <Row>
      <Card shadow>
        <example style="height: 310px;"/>
      </Card>
    </Row> -->
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      inforCardData: [
        { title: '新增用户', icon: 'md-person-add', count: 803, color: '#2d8cf0' },
        { title: '累计点击', icon: 'md-locate', count: 232, color: '#19be6b' },
        { title: '新增问答', icon: 'md-help-circle', count: 142, color: '#ff9900' },
        { title: '分享统计', icon: 'md-share', count: 657, color: '#ed3f14' },
        { title: '新增互动', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },
        { title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4' }
      ],
      pieData: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ],
      barData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324
      }
    }
  },
  mounted () {
    //
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
.coupon-items{text-align: center}

.pc-coupon-item{
  display: inline-block;
  background-image: url(https://img.alicdn.com/tfs/TB1SoSbdxiH3KVjSZPfXXXBiVXa-1120-236.png);
  background-size: cover;
  box-shadow: 0 4px 8px 0 hsla(0,0%,50%,.5);
  border-radius: 9px;
  width: 560px;
  height: 118px;
  margin: 0 auto;
  padding: 20px 24px;
}
.item-left {float: left;}
.coupon-item-title {
    text-align: left;
    font-size: 16px;
    color: #fff;
    letter-spacing: .86px;
    line-height: 22px;
}
.big-coupon-title {
    text-align: left;
    font-size: 36px;
    color: #fff;
    letter-spacing: 1.29px;
    line-height: 44px;
    padding: 0 2px;
    display: inline-block;
    font-weight: 500;
}
.coupon-label {
    background: #fff;
    border-radius: 2px;
    display: inline-block;
    height: 20px;
    line-height: 20px;
    padding: 0 9px;
    font-size: 12px;
    color: #ff5a00;
    margin-left: 13px;
    letter-spacing: .46px;
}
.coupon-item-desc {
    text-align: left;
    font-size: 14px;
    color: #fff;
    letter-spacing: .86px;
    line-height: 22px;
    margin-top: 6px;
}
.coupon-btn {
    float: right;
    background: #2d8cf0;
    padding: 0 33px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #fff;
    margin-top: 24px;
    cursor: pointer;
}
.coupon-activity-img {
  display: inline-block;
  height: 118px;
  margin-left: 12px;
}
</style>
