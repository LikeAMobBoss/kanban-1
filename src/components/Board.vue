<template>
  <div class='myBoard'>
    <div class = 'container'>
    <div class='well'>
      <h2>Board Name:</h2>
      <p>{{board.name}}</p> <br>
      <h4>Description:</h4>
      <p>{{board.description}}</p><br>
      <button type="button" class='btn btn-primary' @click="listFormToggle" v-show="addListButton">Add a List</button>
    </div>
    </div>
    <br><br>
    <div class='container'>
      <div class='row'>
          <form class="form-inline create-list-form" @submit.prevent="createList">
            <div class="form-group">
              <input type="text" class="form-control" v-model="name" name="name" placeholder="Name" />
              <input type="text" class="form-control" v-model="description" name="description" placeholder="List Description" />
              <button type="submit" class="btn btn-primary" id="create-list-button" @click="listFormToggleBack">Create New List</button>
              <button
                type="button" class="btn btn-primary" @click="listFormToggleBack">Cancel</button>
            </div>
          </form>
          <br><br>
        <list v-for="list in lists" :list='list'></list>
        <div class="ListForm" v-show="newList">
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
  .myBoard {
    background: url('https://slack-imgs.com/?c=1&url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1495141929506-f34c93658f5d%3Fdpr%3D1%26auto%3Dcompress%2Cformat%26fit%3Dcrop%26w%3D1199%26h%3D1799%26q%3D80%26cs%3Dtinysrgb%26crop%3D%26bg%3D') no-repeat center center fixed;
    color: black;
    text-shadow: 1px 1px grey;
  }
.well{
  margin-top: 15px;
  background: antiquewhite
}
  a {
    color: black;
  }
</style>