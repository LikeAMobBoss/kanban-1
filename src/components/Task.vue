<template>
  <div class='indTask'>
    <div class='well'>
      <p>Task Name: {{task.name}} <br> Description: {{task.description}}</p><button class="btn btn-xs btn-default" @click="removeTask"><span class="glyphicon glyphicon-trash"></span></button>
      <div class='dropdown'>
        <button class="btn btn-xs btn-default dropdown-toggle" type="button" data-toggle="dropdown">Move Task
  <span class="caret"></span></button>
        <ul class="dropdown-menu">
          <li><a href="#">HTML</a></li>
          <li><a href="#">CSS</a></li>
          <li><a href="#">JavaScript</a></li>
        </ul>
      </div>
    </div><br>
    <a @click="commentToggle" v-show="taskComments1">
      <h5>Show Comments <span class="glyphicon glyphicon-chevron-down"></span></h5>
    </a>
    <div class='taskComments' v-show='taskComments'>
      <a @click="commentToggle">
        <h5>Hide Comment <span class="glyphicon glyphicon-chevron-up"></span></h5>
      </a>
      <comments v-for="comment in comments" :comment='comment'></comments>
      <button type="button" class="btn btn-primary" @click="commentFormToggle" v-show="addCommentButton">Add a Comment</button><br><br>
      <div class="commentForm" v-show="newComment">
        <form class="form-inline create-comment-form" @submit.prevent="createComment">
          <div class="form-group">
            <input type="text" class="form-control" v-model="name" name="name" placeholder="Name" />
            <input type="text" class="form-control" v-model="description" name="description" placeholder="Comment Description" />
            <button type="submit" class="btn btn-primary" id="create-comment-button" @click="commentFormToggleBack">Create New Comment</button>
            <button
              type="button" class="btn btn-primary" @click="commentFormToggleBack">Cancel</button>
          </div>
        </form>
      </div>
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
        addCommentButton: true,
        taskComments: false,
        taskComments1: true
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
      commentToggle() {
        if (this.taskComments == false) {
          this.taskComments = true;
          this.taskComments1 = false;
        } else {
          this.taskComments = false;
          this.taskComments1 = true;
        }
      },
      commentFormToggleBack() {
        this.newComment = false;
        this.addCommentButton = true;
      },
      removeTask() {
        console.log("removeTask firing")
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
  .indTask {
    padding: 15px;
    margin: 5px;
    border-radius: 15px 15px;
    background: green;
    box-shadow: 1px 5px 25px #80ffff;
    color: black;
  }

  a {
    color: black;
    box-shadow: 0px 0px;
  }

  .well {
    background: #ccffcc;
  }
</style>