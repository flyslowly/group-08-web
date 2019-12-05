<template>
  <div>
    <div class="content">
      <h1>Hello, {{student.name.fname}}!</h1>
    </div>
    <b-card no-body class="content">
      <b-tabs card>
        <b-tab title="Todos" active>
          <b-container class="content" fluid>
            <b-row class="justify-content-center">
              <b-col cols="8" md="4">
                <b-card class="p-3">
                  <b-form v-if="todoform === 'create'">
                    <h3>Create Todo</h3>
                    <b-form-group>
                      <label>Title</label>
                      <b-form-input
                        required
                        placeholder="Enter todo title"
                        v-model="todo.title"
                        :state="titleState"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group>
                      <label>Date</label>
                      <b-form-input
                        required
                        type="date"
                        v-model="todo.date"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group>
                      <label>Description</label>
                      <b-form-textarea
                        v-model="todo.description"
                        placeholder="Enter description"
                        rows="3"
                        max-rows="6"
                      ></b-form-textarea>
                    </b-form-group>

                    <b-button variant="primary" @click="createTodo">Create</b-button>
                  </b-form>

                  <b-form v-else>
                    <h3>Update Todo</h3>
                    <b-form-group>
                      <label>Title</label>
                      <b-form-input
                        required
                        placeholder="Enter todo title"
                        v-model="todo.title"
                        :state="titleState"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group>
                      <label>Date</label>
                      <b-form-input
                        required
                        type="date"
                        v-model="todo.date"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group>
                      <label>Description</label>
                      <b-form-textarea
                        v-model="todo.description"
                        placeholder="Enter description"
                        rows="3"
                        max-rows="6"
                      ></b-form-textarea>
                    </b-form-group>

                    <b-button variant="primary" @click="updateTodo">Update</b-button>
                  </b-form>
                </b-card>
              </b-col>
              <b-col cols="8" md="8">
                <b-list-group>
                  <todo-item v-for="todo in todos" :key="todo._id" :todo="todo" @delete-todo="deleteTodo" @edit-todo="editTodo"></todo-item>
                </b-list-group>
              </b-col>
            </b-row>
          </b-container>
        </b-tab>
        <b-tab title="Holidays">
          <div class="holidays">
            <b-list-group>
              <holiday-item v-for="holiday in holidays" :key="holiday._id" :holiday="holiday"></holiday-item>
            </b-list-group>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import { Api } from '@/Api'
import TodoItem from '@/components/TodoItem'
import HolidayItem from '@/components/HolidayItem'

export default {
  name: 'student',
  data() {
    return {
      student: {
        ssn: '',
        name: {
          fname: '',
          lname: ''
        },
        sex: '',
        _id: ''
      },
      todos: [],
      courses: [],
      todo: {
        title: '',
        date: '',
        description: '',
        _id: ''
      },
      todoform: 'create',
      oldTodo: {
        title: '',
        date: '',
        description: '',
        _id: ''
      },
      holidays: []
    }
  },
  mounted() {
    this.getStudent()
    setTimeout(() => {
      this.getTodos()
    }, 500)
    this.getHolidays()
  },
  created() {
  },
  computed: {
    titleState() {
      if (this.todo.title.length === 0) {
        return null
      } else {
        return true
      }
    }
  },
  methods: {
    createTodo() {
      var todo = this.todo
      Api.post(`students/${this.student._id}/todos/`, todo)
        .then(response => {
          this.todos.push(response.data)
          this.todo.title = ''
          this.todo.date = ''
          this.todo.description = ''
        })
        .catch(error => {
          console.log(error)
        })
    },
    getStudent() {
      Api.get(this.$route.fullPath)
        .then(response => {
          this.student = response.data[0]
        })
        .catch(error => {
          this.student = ''
          console.log(error)
        })
    },
    getTodos() {
      Api.get(`students/${this.student._id}/todos`)
        .then(response => {
          this.todos = response.data
        })
        .catch(error => {
          this.todos = []
          console.log(error)
        })
    },
    deleteTodo(id) {
      Api.delete(`/todos/${id}`)
        .then(response => {
          var index = this.todos.findIndex(todo => todo._id === id)
          this.todos.splice(index, 1)
        })
        .catch(error => {
          console.log(error)
        })
    },
    editTodo(id) {
      Api.get(`/todos/${id}`)
        .then(response => {
          this.todo = response.data
          this.oldTodo = response.data
          this.todoform = ''
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateTodo() {
      if (this.oldTodo.title === this.todo.title ||
      this.oldTodo.date === this.todo.date ||
      this.oldTodo.description === this.todo.description) {
        Api.patch(`todos/${this.todo._id}/`, this.todo)
          .then(response => {
            this.getTodos()
            this.todoform = 'create'
            this.todo.title = ''
            this.todo.date = ''
            this.todo.description = ''
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        Api.put(`todos/${this.todo._id}/`, this.todo)
          .then(response => {
            this.getTodos()
            this.todoform = 'create'
            this.todo.title = ''
            this.todo.date = ''
            this.todo.description = ''
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    getHolidays() {
      Api.get('holidays')
        .then(response => {
          this.holidays = response.data.holidays
        })
        .catch(error => {
          this.holidays = []
          console.log(error)
        })
    }
  },
  components: {
    TodoItem,
    HolidayItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  padding: 0;
  margin: 0;
  background-color: #f8f9fa;
}

h1 {
  margin-bottom: 0;
}

a {
  color: #42b983;
}
.createButton {
  margin-bottom: 1em;
}

h1 {
  align-content: center;
}

.holidays {
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2em;
}

</style>
