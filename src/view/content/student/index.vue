<template>
  <Card>
    <Row :gutter="16">
      <Col :lg="4" :md="6" :sm="12" :xs="24">
        <Input v-model="filter.search$$name$$all" placeholder="姓名"/>
      </Col>
      <Col :lg="8" :md="8" :sm="12" :xs="24">
        <Button @click="search" icon="ios-search" type="primary">搜索</Button>&nbsp;
        <Button @click="handleAdd" icon="md-add" type="primary">添加</Button>
      </Col>
    </Row>
    <div style="margin:10px 0">
      <Table size="small" border :loading="loading" :columns="columns" :data="list"
>
        <template slot-scope="{row,index}" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="handleEdit(row)">修改</Button>
          <Button type="error" size="small" @click="handleDelete([row.id],index)">删除</Button>
        </template>
      </Table>
    </div>
    <Page :total="total" :page_size="filter.pageSize" @on-change="pageChange" @on-page-size-change="sizeChange"
    show-elevator show-total show-sizer/>
    <Modal ref="modalDom" :temp="temp" @onOK="e=>this.save(e)"/>
  </Card>
</template>
<script>
import { list,create,update,remove } from '@/api/base'
import Modal from './modal'
const columns=[
  {title: 'ID',key: 'id',width:60,align: 'center'},
  {title: '姓名',key: 'name',align: 'center'},
  {title: '操作',slot: 'action',width: 150,align: 'center'}
]
export default {
  components:{ Modal },
  data () {
    return {
      model:'student',
      loading:true,
      filter:{pageSize:10},
      columns:columns,
      list:[],
      total:0,
      temp:{},
    }
  },
  created () {this.getList()},
  methods: {
    async getList(){
      this.loading = true
      const res    = await list(this.model,this.filter)
      this.loading = false
      if(!res.success) return this.$Message.error(res.errmsg)
      this.list    = res.data.list
      this.total   = res.data.total
    },
    search () {this.getList()},
    pageChange (page) {this.filter.page=page;this.getList()},
    sizeChange (size) {this.filter.pageSize=size;this.getList()},
    handleAdd () {
      this.temp = {}
      this.$refs["modalDom"].isShow(true)
    },
    handleEdit (row) {
      this.temp = row
      this.$refs["modalDom"].isShow(true)
    },
    async save(formData){
      if(!formData) formData = this.temp
      const {id,...vals}=formData
      if(id){
        const res = await update(this.model,id,vals)
        if(!res.success) return this.$Message.error(res.errmsg)
        this.getList()
      }else{
        const res = await create(this.model,formData)
        if(!res.success) return this.$Message.error(res.errmsg)
        this.list.unshift(res.data)
        this.total+=1
      }
      this.temp = {}
      this.$refs["modalDom"].isShow(false)
    },
    handleDelete (ids,index) {
      this.$Modal.confirm({
        title: "确定删除吗?",
        content: "删除数据将不可恢复，是否继续？",
        onOk:()=>{
          this.delete(ids,index)
        }
      })
    },
    async delete(ids,index){
      const res = await remove(this.model,ids)
      if (!res.success) return this.$Message.error(res.errmsg)
      if (index) return this.list.splice(index, 1)
      this.getList()
    },
  }
}
</script>