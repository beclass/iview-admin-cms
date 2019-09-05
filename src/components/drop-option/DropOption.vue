<template>
  <Dropdown>
    <Button :type="title?'primary':'dashed'">
      {{title}}
      <Icon v-if="!title" type="ios-list"/>
      <Icon type="ios-arrow-down"/>
    </Button>
    <DropdownMenu slot="list">
      <DropdownItem @click.native="onClick(item.key)" :key="item.key" v-for="item in options">{{item.name}}</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
export default {
  props: {
    title: { type: String, default: '' },
    options: { type: Array, default: () => ([]) }
  },
  methods: {
    onClick (key) {
      this.$emit('onMenuClick', key)
    }
  }

}
</script>
