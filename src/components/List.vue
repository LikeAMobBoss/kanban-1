<template>
  <div class='col-sm-4 indList'>
    <div class='well'>
      <h4>List Name:</h4>
      <p>{{list.name}}</p><br>
      <p>Description: {{list.description}}</p><button class="btn btn-xs btn-default" @click="removeList"><span class="glyphicon glyphicon-trash"></span></button><br>
    </div>
    <a @click="taskToggle" v-show="listTasks1">
      <h3>Show Tasks <span class="glyphicon glyphicon-chevron-down"></span></h3>
    </a>
    <button type="button" class="btn btn-primary" @click="taskFormToggle" v-show="addTaskButton">Add a Task</button><br><br>
    <div class="taskForm" v-show="newTask">
      <form class="form-inline create-task-form" @submit.prevent="createTask">
        <div class="form-group">
          <input type="text" class="form-control" v-model="name" name="name" placeholder="Name" />
          <input type="text" class="form-control" v-model="description" name="description" placeholder="Task Description" /><br>
          <button type="submit" class="btn btn-primary" id="create-task-button" @click="taskFormToggleBack">Create New Task</button>
          <button type="button" class="btn btn-primary" @click="taskFormToggleBack">Cancel</button>
        </div>
      </form>
    </div>
    <div class='listTasks' v-show="listTasks">
      <a @click="taskToggle">
        <h3>Hide Tasks <span class="glyphicon glyphicon-chevron-up"></span></h3>
      </a>
      <div>
        <task v-for="task in tasks" :task='task'></task>
      </div>
    </div>
    <br><br> <br><br>
  </div>
</template>

<script>
  import task from '../components/Task'
  export default {
    name: 'list',
    props: ['list'],
    data() {
      return {
        name: '',
        description: '',
        newTask: false,
        addTaskButton: true,
        listTasks: false,
        listTasks1: true
      }
    },
    created() {
      this.$store.dispatch('getList', this.list)
      this.$store.dispatch('getTask', this.list)

    },
    methods: {
      createTask() {
        this.$store.dispatch('createTask', {
          name: this.name,
          description: this.description,
          boardId: this.$route.params.id,
          listId: this.list._id
        })
      },
      removeList() {
        this.$store.dispatch('removeList', this.list)
      },
      taskToggle() {
        if (this.listTasks == false) {
          this.listTasks = true;
          this.listTasks1 = false;
        } else {
          this.listTasks = false;
          this.listTasks1 = true;
        }
      },
      taskFormToggle() {
        this.newTask = true;
        this.addTaskButton = false;
      },
      taskFormToggleBack() {
        this.newTask = false;
        this.addTaskButton = true;
      }
    },
    computed: {
      board() {
        return this.$store.state.activeBoard
      },
      // list() {
      //   return this.$root.$data.store.state.activeList
      // },
      tasks() {
        return this.$store.state.activeTasks[this.list._id]
      },
      comments() {
        return this.$store.state.activeComments
      },
    },
    components: {
      task
    }
  }

</script>

<style scoped>
  .indList {
    padding: 15px;
    border: 1px dotted black;
    border-radius: 15px 15px;
    background: brown;
    box-shadow: 10px 10px 100px #ff6666;
    color: antiquewhite
  }

  a {
    color: black;
    text-shadow: 0px 0px;
  }

  .well {
    background: #a6a6a6;
    padding: 5px;
  }
</style>