<template>
  <div class = 'myBoard'>
    <h2>Board Name:</h2> <p>{{board.name}}</p> <br><h4>Description:</h4> <p>{{board.description}}</p><br>
        <button type="button" class='btn btn-primary' @click="listFormToggle" v-show="addListButton">Add a List</button><br><br>
    <div class='container'>
      <div class='row'>
        <list v-for="list in lists" :list='list'></list>
        <div class="ListForm" v-show="newList">
          <form class="form-inline create-list-form" @submit.prevent="createList">
            <div class="form-group">
              <input type="text" class="form-control" v-model="name" name="name" placeholder="Name" />
              <input type="text" class="form-control" v-model="description" name="description" placeholder="List Description" />
              <button type="submit" class="btn btn-primary" id="create-list-button" @click="listFormToggleBack">Create New List</button><button type="button" class="btn btn-primary" @click="listFormToggleBack">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <br><br>
  </div>
</template>

<script>
  import list from '../components/List'
  export default {
    name: 'board',
    data() {
      return {
        name: '',
        description: '',
        newList: false,
        addListButton: true
      }
    },
    created() {
      this.$store.dispatch('getBoard', this.$route.params.id)
    },
    methods: {
      createList(list) {
        this.$store.dispatch('createList', {
          name: this.name,
          description: this.description,
          boardId: this.$route.params.id
        })
      },
      listFormToggle() {
        this.newList = true;
        this.addListButton = false;
      },
      listFormToggleBack() {
        this.newList = false;
        this.addListButton = true;
      }
    },
    computed: {
      board() {
        return this.$store.state.activeBoard
      },
      lists() {
        return this.$store.state.activeLists
      },
      tasks() {
        return this.$store.state.activeTasks
      },
      comments() {
        return this.$store.state.activeComments
      },
    },
    components: {
      list
    }
  }

</script>

<style scoped>
.myBoard{
  background: blue;
  color: white;
  text-shadow: 1px 1px grey; 
  
}
a{
  color: black;
}

</style>