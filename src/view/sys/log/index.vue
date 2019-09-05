<template>
  <Card>
    <div style="margin:10px 0">
      <Table size="small" border :loading="loading" :columns="columns" :data="list">
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
import {formatDay} from '@/libs/util'
import {hasOneOf} from '@/libs/tools'
import Modal from './modal'
const columns=[
  {title: 'ID',key: 'id',width:60,align: 'center'},
  {title: '用户',key: 'username',align: 'center'},
  {title: 'ip',key: 'ip',align: 'center'},
  {title: '类型',key: 'type',align: 'center',render: (h, params) => { return h('div',['登录'][params.row.type])}},
  {title: '时间',key: 'time',align: 'center'},
  {title: '操作',slot: 'action',width: 150,align: 'center'}
]
export default {
  components:{ Modal },
  data () {
    return {
      model:'syslog',
      loading:true,
      filter:{pageSize:10,belongsTo: { name: 'manager', fkey: 'manager_id', attrs: ['username'] } },
      columns:columns,
      list:[],
      total:0,
      temp:{},
    }
  },
  created () {this.getList()},
  computed: {
    access () {
      return this.$store.state.user.access
    },
  },
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
      if(!this.havePower("sys.add_syslog")) return
      this.temp = {}
      this.$refs["modalDom"].isShow(true)
    },
    handleEdit (row) {
      if(!this.havePower("sys.edit_syslog")) return
      this.temp = row
      this.$refs["modalDom"].isShow(true)
    },
    async save(formData){
      if(!formData) formData = this.temp
      formData.time = formatDay(formData.time)
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
      if(!this.havePower("sys.del_syslog")) return
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
    havePower(name){
      const power = hasOneOf([name], this.access)
      if(!power) this.$Message.warning("无权限操作")
      return power
    }
  }
}
</script>