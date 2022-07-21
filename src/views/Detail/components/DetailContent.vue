<template>
  <div class="markdown-body" v-html="detailInfo"></div>
</template>

<script>
export default {
  props: {
    detailInfo: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped></style>
