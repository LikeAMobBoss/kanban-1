<template>
  <div id = "tasks">
      <p>Comment Name: {{comment.name}} <br> Description: {{comment.description}}</p><button class = "btn btn-xs btn-default" @click="removeComment()"><span class="glyphicon glyphicon-trash"></span></button>
      
  </div>
</template>

<script>
export default {
  name: 'comments',
  props: ['comment'],
  mounted(){
  },
  data(){
    return{

    }
  },
  methods:{
    createComments(){
      this.$store.dispatch('createComments', {
        name: this.name,
        description: this.description,
        boardId: this.task.boardId,
        listId: this.task.listId
      })
    },
    removeComment(){
      this.$store.dispatch('removeComment', this.comment)
    }
  }
}
</script>

<style scoped>
#tasks{
  padding: 10px;
  margin: 3px;
  border-radius: 15px 15px;
  background: grey;
  color: white;
  box-shadow: 1px 5px 100px #e6e6e6;
}
</style>