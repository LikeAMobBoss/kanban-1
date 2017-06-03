<template>
<div class = "container-fluid">
<div class = "boardsBody">
  <div id="boards-view">
    <button type="button"class='btn btn-primary' @click="boardFormToggle" v-show="addBoardButton">Add a Board</button>
    <button type="button" class='btn btn-primary'><router-link to="login">Login/Register</router-link></button><br><br>
    <div class="Register" v-show="newBoard">
      <form class="form-inline create-board-form" @submit.prevent="createBoard">
        <div class="form-group">
          <input type="text" class="form-control" v-model="name" name="name" placeholder="Name" />
          <input type="text" class="form-control" v-model="description" name="description" placeholder="Board Description" />
          <button type="submit" class="btn btn-primary" id="create-user-button" @click="boardFormToggleBack">Create New Board</button>
        </div>
      </form>
    </div>
    <div id='myBoards'>
      <div class='container-fluid'>
        <div class = 'row'> 
          <div class = "col-sm-3" v-for="board in boards"><div class='well eachBoard boardName'>
          <router-link :to="'/boards/'+board._id">{{board.name}}</router-link> <button type="button" class='btn btn-xs btn-default' @click="removeBoard(board)"><span class="glyphicon glyphicon-trash"></span></button></div></div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'boards',
    data() {
      return {
        name: '',
        description: '',
        newBoard: false,
        addBoardButton: true
      }
    },

    mounted() {
      //debugger
      this.$store.dispatch('getBoards')
    },
    computed: {
      boards() {
        return this.$store.state.boards
      }
    },
    methods: {
      createBoard() {
        debugger
        this.$store.dispatch('createBoard', {
          name: this.name,
          description: this.description
        })
      },
      removeBoard(board) {
        this.$store.dispatch('removeBoard', board)
      },
      boardFormToggle() {
        this.newBoard = true;
        this.addBoardButton = false;
      },
      boardFormToggleBack() {
        this.newBoard = false;
        this.addBoardButton = true;
      }
    }
  }

</script>

<style scoped>

#myBoards{
  align-content: center;
}
.eachBoard{
  border: 1px solid black;
  background: grey;
}
.boardName{
  margin: 5%
}
a{
  color:antiquewhite;
}
.boardsBody{
  background: url('https://slack-imgs.com/?c=1&url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1495141929506-f34c93658f5d%3Fdpr%3D1%26auto%3Dcompress%2Cformat%26fit%3Dcrop%26w%3D1199%26h%3D1799%26q%3D80%26cs%3Dtinysrgb%26crop%3D%26bg%3D') no-repeat center center fixed;
  background-size: 100% 100%
}

</style>