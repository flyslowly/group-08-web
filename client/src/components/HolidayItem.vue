<template>
  <b-list-group-item>
    The {{ holiday.name }} is on {{ holiday.date }}
  </b-list-group-item>
</template>

<script>

export default {
  name: 'holiday-item',
  props: ['holiday']
}
</script>

<style scoped>
</style>
