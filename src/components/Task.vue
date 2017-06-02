<template>
  <div class = 'indTask'>
    <p>Task Name: {{task.name}} <br> Description: {{task.description}}</p><button class = "btn btn-xs btn-default" @click="removeTask"><span class="glyphicon glyphicon-trash"></span></button><br>
    <comments v-for="comment in comments" :comment='comment'></comments>
    <button type="button" class="btn btn-primary" @click="commentFormToggle" v-show="addCommentButton">Add a Comment</button><br><br>
    <div class="commentForm" v-show="newComment">
      <form class="form-inline create-comment-form" @submit.prevent="createComment">
        <div class="form-group">
          <input type="text" class="form-control" v-model="name" name="name" placeholder="Name" />
          <input type="text" class="form-control" v-model="description" name="description" placeholder="Comment Description" />
          <button type="submit" class="btn btn-primary" id="create-comment-button" @click="commentFormToggleBack">Create New Comment</button><button type="button" class="btn btn-primary" @click="commentFormToggleBack">Cancel</button>
        </div>
      </form>
    </div>
    <br><br>
  </div>
</template>

<script>
  import comments from '../components/Comments'
  export default {
    name: 'task',
    props: ['task'],
    data() {
      return {
        name: '',
        description: '',
        newComment: false,
        addCommentButton: true
      }
    },
    created() {
      this.$store.dispatch('getComments', this.task)
      
    },
    methods: {
      createComment() {
        this.$store.dispatch('createComment', {
        name: this.name,
        description: this.description,
        boardId: this.$route.params.id,
        listId: this.task.listId,
        taskId: this.task._id
        })
      },
      commentFormToggle() {
        this.newComment = true;
        this.addCommentButton = false;
      },
      commentFormToggleBack() {
        this.newComment = false;
        this.addCommentButton = true;
      },
      removeTask(){
        console.log("component firing")
        this.$store.dispatch('removeTask', this.task)
      }
    },
    computed: {
      board() {
        return this.$store.state.activeBoard
      },
      list() {
        return this.$store.state.activeList
      },
      comments() {
        return this.$store.state.activeComments[this.task._id]
      },
    },
    components: {
      comments
    }
  }

</script>

<style scoped>
.indTask{
  padding: 15px;
  margin: 5px;
  border-radius: 15px 15px;
  background: green;
  box-shadow: 1px 5px 25px #70db70;
}

</style>