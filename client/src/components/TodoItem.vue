<template>
  <b-list-group-item>
    <b-row>
      <b-col class="todo-text" cols="9">
        <b-row>
          <b-col sm="3">
            <label>Title: </label>
          </b-col>
          <b-col sm="9">
            <p>{{todo.title}}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label>Date: </label>
          </b-col>
          <b-col sm="9">
            <p>{{todo.date}}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label>Description: </label>
          </b-col>
          <b-col sm="9">
            <p>{{todo.description}}</p>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="3">
        <b-button type="button" class="edit" @click="$emit('edit-todo', todo._id)">Edit</b-button>
        <b-button type="button" class="close" @click="$emit('delete-todo', todo._id)">&times;</b-button>
      </b-col>
    </b-row>
  </b-list-group-item>
</template>

<script>

export default {
  name: 'todo-item',
  props: ['todo']
}
</script>

<style scoped>
.todo-text {
  text-align: left;
}
</style>
