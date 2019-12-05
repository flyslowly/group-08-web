<template>
  <div>
    <b-container id="content" fluid>
      <b-row class="justify-content-center">
        <b-col cols="12" md="8">
          <b-jumbotron
            bg-variant="light"
            header="Gu-Calender"
            lead="This is a demo calender for GU students and teachers"
            fluid
          >
            <p>
              Greetings from the server:
              <br />
              {{ message }}
            </p>
            <!-- <b-button variant="primary" href="/students">Student</b-button>&nbsp;
            <b-button variant="primary" href="/teachers">Teacher</b-button>-->
          </b-jumbotron>
        </b-col>
        <b-col cols="8" md="4">
          <b-card class="p-3">
          <b-form v-if="formtype === 'login'">
            <h3>Login</h3>
            <b-form-group>
              <label>Your ssn number:</label>
              <b-form-input
                required
                placeholder="Enter your ssn number"
                v-model="student.ssn"
                :state="ssnState"
              ></b-form-input>
              <b-form-invalid-feedback>
                Please enter in the style of yyyymmddxxxx
              </b-form-invalid-feedback>
            </b-form-group>

            <b-button variant="primary" @click="onLogin">Login</b-button>&nbsp;
            <b-button variant="danger" @click="onToRegister">To Register</b-button>
          </b-form>

          <b-form v-else>
            <h3>Register</h3>
            <b-form-group>
              <label>Your ssn number:</label>
              <b-form-input
                required
                placeholder="Enter your ssn number"
                v-model="student.ssn"
                :state="ssnState"
              ></b-form-input>
              <b-form-invalid-feedback>
                Please enter in the style of yyyymmddxxxx
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group>
              <label>Family name:</label>
              <b-form-input
                required
                placeholder="Enter your family name"
                v-model="student.name.fname"
                :state="fnameState"
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <label>Last name:</label>
              <b-form-input
                required
                placeholder="Enter your last name"
                v-model="student.name.lname"
                :state="lnameState"
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <lable>Sex</lable>
              <b-form-select v-model="student.sex" :options="options" :state="sexState" required></b-form-select>
            </b-form-group>

            <b-button variant="primary" @click="onRegister">Rigister</b-button>&nbsp;
            <b-button variant="danger" @click="onToLogin">To Login</b-button>
          </b-form>
        </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'home',
  data() {
    return {
      message: '',
      student: {
        ssn: '',
        name: {
          fname: '',
          lname: '' },
        sex: ''
      },
      teacher: {
        ssn: '',
        name: {
          fname: '',
          lname: '' },
        sex: ''
      },
      formtype: 'login',
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'Male', text: 'Male' },
        { value: 'Female', text: 'Female' },
        { value: 'Other', text: 'Other' }
      ]
    }
  },
  mounted() {
    this.getMessage()
  },
  computed: {
    ssnState() {
      if (this.student.ssn.length === 12) {
        return true
      } else if (this.student.ssn.length === 0) {
        return null
      } else {
        return false
      }
    },
    fnameState() {
      if (this.student.name.fname.length === 0) {
        return null
      } else {
        return true
      }
    },
    lnameState() {
      if (this.student.name.lname.length === 0) {
        return null
      } else {
        return true
      }
    },
    sexState() {
      if (this.student.sex.length === 0) {
        return null
      } else {
        return true
      }
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    },
    onLogin() {
      if (this.student.ssn !== '') {
        this.$router.push({
          path: '/students',
          query: {
            ssn: this.student.ssn
          }
        })
      }
    },
    onRegister() {
      var newStudent = this.student
      Api.post('/students', newStudent)
        .then(response => {
          this.$router.push({
            path: '/students',
            query: {
              ssn: this.student.ssn
            }
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    onToRegister() {
      this.formtype = ''
    },
    onToLogin() {
      this.formtype = 'login'
    }
  }
}
</script>

<style>
#content {
  padding: 0;
  background-color: #f8f9fa;
}

.p-3 {
  text-align: left;
  margin: 30px;
}
</style>
