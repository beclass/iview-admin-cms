<template>
  <Card>
    <div>
      <Input v-model="filter.search$$title$$all" placeholder="名称" style="width: 200px"/>
      <Select v-model="filter.article_type_id" clearable  style="width:150px;margin-left:10px">
        <Option v-for="(item,index) in types" :key="index" :value="item.id">{{item.name}}</Option>
      </Select>&nbsp;
      <Button @click="search" icon="ios-search" type="primary">搜索</Button>&nbsp;
      <Button @click="handleAdd" icon="md-add" type="primary">添加</Button>
    </div>
    <div style="margin:10px 0">
      <Table  size="small" border :loading="loading" :columns="columns" :data="list">
        <template slot-scope="{row,index}" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="handleEdit(row.id)">修改</Button>
          <Button type="error"   size="small" @click="handleDelete(row.id,index)">删除</Button>
        </template>
      </Table>
    </div>
    <Page :total="total" :page_size="filter.pageSize" @on-change="pageChange" @on-page-size-change="sizeChange" show-elevator show-total show-sizer/>
  </Card>
</template>
<script>
import { list, remove } from '@/api/base'
const columns = [
  { title: 'ID', key: 'id', width: 60, align: 'center' },
  { title: '标题', key: 'title', align: 'center' },
  { title: '类型', key: 'typeName', align: 'center' },
  { title: '创建时间', key: 'c_time', align: 'center' },
  { title: '操作', slot: 'action', width: 150, align: 'center' }
]
export default {
  components: {},
  data () {
    return {
      model: 'article',
      loading: true,
      filter: { pageSize: 10, belongsTo: { name: 'article_type', fkey: 'article_type_id', attrs: ['name->typeName'] } },
      columns: columns,
      list: [],
      total: 0,
      types: []
    }
  },
  created () { this.initData(); this.getList() },
  methods: {
    async initData () {
      const result = await list('articletype', { pageSize: 100 })
      if (result.success) this.types = result.data.list
    },
    async getList () {
      this.loading = true
      const res = await list(this.model, this.filter)
      this.loading = false
      if (!res.success) return this.$Message.error(res.errmsg)
      this.list = res.data.list
      this.total = res.data.total
    },
    search () { this.getList() },
    pageChange (page) { this.filter.page = page; this.getList() },
    sizeChange (size) { this.filter.pageSize = size; this.getList() },
    handleAdd () {
      this.$router.push('/content/article/add')
    },
    handleEdit (id) {
      this.$router.push('/content/article/edit/' + id)
    },
    handleDelete (id, index) {
      this.$Modal.confirm({
        title: '确定删除吗?',
        content: '删除数据将不可恢复，是否继续？',
        onOk: () => {
          this.delete([id], index)
        }
      })
    },
    async delete (ids, index) {
      const res = await remove(this.model, ids)
      if (!res.success) return this.$Message.error(res.errmsg)
      this.list.splice(index, 1)
    }
  }
}
</script>
