<template>
  <div id="tasks">
    <div class='well'>
      <p>Comment Name: {{comment.name}} <br> Description: {{comment.description}}</p><button class="btn btn-xs btn-default"
        @click="removeComment()"><span class="glyphicon glyphicon-trash"></span></button>
         <div class='dropdown'>
        <button class="btn btn-xs btn-default dropdown-toggle" type="button" data-toggle="dropdown">Move Comment
  <span class="caret"></span></button>
        <ul class="dropdown-menu">
          <li><a href="#">HTML</a></li>
          <li><a href="#">CSS</a></li>
          <li><a href="#">JavaScript</a></li>
        </ul>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'comments',
    props: ['comment'],
    mounted() {
    },
    data() {
      return {

      }
    },
    methods: {
      createComments() {
        this.$store.dispatch('createComments', {
          name: this.name,
          description: this.description,
          boardId: this.task.boardId,
          listId: this.task.listId
        })
      },
      removeComment() {
        this.$store.dispatch('removeComment', this.comment)
      }
    }
  }

</script>

<style scoped>
  #tasks {
    padding: 10px;
    margin: 3px;
    border-radius: 15px 15px;
    background: black;
    color: white;
    box-shadow: 1px 5px 100px #e6e6e6;
  }
  .well{
    background: #666666;
  }
</style>