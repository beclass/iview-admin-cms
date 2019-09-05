<template>
  <Card>
    <Row :gutter="16">
      <Col :lg="4" :md="4" :sm="12" :xs="24">
        <Input v-model="filter.search$$name$$all" placeholder="名称"/>
      </Col>
      <Col :lg="16" :md="16" :sm="12" :xs="24">
        <Button @click="search" icon="ios-search" type="primary">搜索</Button>&nbsp;
        <Button @click="handleAdd" icon="md-add" type="primary">添加</Button>
      </Col>
      <Col :lg="4" v-if="selectedRowKeys.length>0" :md="4" :sm="24" :xs="24" style="text-align:right">
        <DropOption title="批量操作" @onMenuClick="e=>onMenuClick(e)" :options="[{key:-1,name:'删除'}]"/>
      </Col>
    </Row>
    <div style="margin:10px 0">
      <Table  size="small" border :loading="loading" :columns="columns" :data="list" @on-selection-change="e=>this.selectedRowKeys = e.map(item=>{return item.id})">
        <template slot-scope="{ row, index }" slot="name">
          <Input type="text" v-model="temp.name" v-if="temp.id === row.id" />
          <span v-else>{{ row.name }}</span>
        </template>
        <template slot-scope="{row,index}" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="handleEdit(row)">修改</Button>
          <Button type="success" size="small" v-if="temp.id === row.id" style="margin-right:5px" @click="save(temp)">保存</Button>
          <Button type="error"   size="small" @click="handleDelete([row.id],index)">删除</Button>
        </template>
      </Table>
    </div>
    <Page :total="total" :page_size="filter.pageSize" @on-change="pageChange" @on-page-size-change="sizeChange"
    show-elevator show-total show-sizer/>
    <Modal ref="modalDom" :temp="temp" @onOK="handleSubmit"/>
  </Card>
</template>
<script>
import { list, create, update, remove } from '@/api/base'
import { hasOneOf } from '@/libs/tools'
import DropOption from '_c/drop-option'
import Modal from './modal'
const columns = [
  { type: 'selection', width: 50, align: 'center' },
  { title: 'ID', key: 'id', width: 60, align: 'center' },
  { title: '名称', slot: 'name', align: 'center' },
  { title: '操作', slot: 'action', width: 180, align: 'center' }
]
export default {
  components: { Modal, DropOption },
  data () {
    return {
      model: 'articletype',
      loading: true,
      filter: { pageSize: 10 },
      columns: columns,
      list: [],
      total: 0,
      temp: {},
      selectedRowKeys: []
    }
  },
  created () { this.getList() },
  computed: {
    access () {
      return this.$store.state.user.access
    }
  },
  methods: {
    async getList () {
      this.loading = true
      const res = await list(this.model, this.filter)
      if (!res.success) return this.$Message.error(res.errmsg)
      this.list = res.data.list
      this.total = res.data.total
      this.loading = false
    },
    search () { this.getList() },
    pageChange (page) { this.filter.page = page; this.getList() },
    sizeChange (size) { this.filter.pageSize = size; this.getList() },
    handleAdd () {
      if (!this.havePower('content.add_articletype')) return
      this.temp = {}
      this.$refs['modalDom'].isShow(true)
    },
    handleEdit (row) {
      this.temp = row
    },
    onMenuClick (key, row, index) {
      switch (key) {
        case -1: this.handleDelete(this.selectedRowKeys); break
        case 1: this.temp = row; this.$refs['modalDom'].isShow(true); break
        case 2: this.handleDelete([row.id], index); break
      }
    },
    async save (formData) {
      if (!formData) formData = this.temp
      const { id, ...vals } = formData
      if (id) {
        const res = await update(this.model, id, vals)
        if (!res.success) return this.$Message.error(res.errmsg)
        this.getList()
      } else {
        const res = await create(this.model, formData)
        if (!res.success) return this.$Message.error(res.errmsg)
        this.list.unshift(res.data)
        this.total += 1
      }
      this.temp = {}
      this.$refs['modalDom'].isShow(false)
    },
    handleSubmit (data) {
      this.save(data)
    },
    handleDelete (ids, index) {
      if (!this.havePower('content.del_articletype')) return
      this.$Modal.confirm({
        title: '确定删除吗?',
        content: '删除数据将不可恢复，是否继续？',
        onOk: () => {
          this.delete(ids, index)
        }
      })
    },
    async delete (ids, index) {
      const res = await remove(this.model, ids)
      if (!res.success) return this.$Message.error(res.errmsg)
      if (index) return this.list.splice(index, 1)
      this.getList()
    },
    havePower (name) {
      const power = hasOneOf([name], this.access)
      if (!power) this.$Message.warning('无权限操作')
      return power
    }
  }
}
</script>
