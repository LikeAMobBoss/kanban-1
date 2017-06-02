import axios from 'axios'
import router from '../router'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

let api = axios.create({
  baseURL: 'https://vue-kanban-k.herokuapp.com/api/',
  timeout: 2000,
  withCredentials: true
})
let auth = axios.create({
  baseURL: 'https://vue-kanban-k.herokuapp.com/',
  timeout: 2000,
  withCredentials: true
})


let handleError = (state, err) => {
  state.error = err
}

export default new Vuex.Store({
  // ALL DATA LIVES IN THE STATE
  // REGISTER ALL DATA HERE 
  state: {
    boards: [],
    activeBoard: {},
    activeLists: [],
    activeList: {},
    activeTasks: {},
    activeComments: {},
    error: {},
    user: {}
  },

  mutations: {
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, activeBoard) {
      state.activeBoard = activeBoard
    },
    setBoard(state, data) {
      state.activeBoard = data.board;
      state.activeLists = data.lists;
    },
    setActiveList(state, activeList) {
      state.activeList = activeList
    },
    setActiveLists(state, activeLists) {
      state.activeLists = activeLists
    },
    setActiveTasks(state, list) {
      Vue.set(state.activeTasks, list._id, list.tasks)
    },
    setActiveComments(state, task) {
      Vue.set(state.activeComments, task._id, task.comments)
    },
    setAuth(state, user) {
      state.user = user
    },
    setUser(state, user){
      state.user = user
    }
  },
  actions: {
    getBoards({ commit, dispatch }) {
      api('boards')
        .then(res => {
          commit('setBoards', res.data.data)
        })
        .catch(handleError)
    },
    getBoard({ commit, dispatch }, id) {
      api('boards/' + id + '/list')
        .then(res => {
          commit('setBoard', res.data.data)
        })
        .catch(handleError)
    },
    createBoard({ commit, dispatch }, board) {
      api.post('boards/', board)
        .then(res => {
          dispatch('getBoards')
        })
        .catch(handleError)
    },
    removeBoard({ commit, dispatch }, board) {
      api.delete('boards/' + board._id)
        .then(res => {
          dispatch('getBoards')
        })
        .catch(handleError)
    },
    getList({ commit, dispatch }, list) {
      api('boards/' + list.boardId + '/list/' + list._id)
        .then(res => {
          console.log('committing to activeList')
          commit('setActiveList', res.data.data)
        })
        .catch(handleError)
    },
    getLists({ commit, dispatch }, boardId, listId) {
      api('boards/' + boardId + '/list/' + listId)
        .then(res => {
          commit('setActiveLists', res.data.data)
        })
        .catch(handleError)
    },
    createList({ commit, dispatch }, list) {
      api.post('lists', list)
        .then(res => {
          dispatch('getBoard', list.boardId)
        })
        .catch(handleError)
    },
    removeList({ commit, dispatch }, list) {
      api.delete('lists/' + list._id)
        .then(res => {
          dispatch('getBoard', list.boardId)
        })
        .catch(handleError)
    },
    createUser({ commit, dispatch }, user) {

      auth.post('register/', user)
        .then(res => {
          console.log(res)
          if(res.data.error){
            return handleError(res.data.error)
          }
          commit('setUser', res.data.data)
          router.push('/')
        })
        .catch(handleError)
    },
    loginUser({ commit, dispatch }, user) {

      auth.post('login/', user)
        .then(res => {
          console.log(res)
          if(res.data.error){
            return handleError(res.data.error)
          }
          commit('setUser', res.data.data)
          router.push('/')
        })
        .catch(handleError)
    },
    getAuth({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setAuth', res.data.data)
          router.push('/')
        }).catch(err => {
          router.push('/login')
        })
    },
    getTask({ commit, dispatch }, list) {
      api('boards/' + list.boardId + '/list/' + list._id)
        .then(res => {
          debugger
          commit('setActiveTasks', res.data.data)
        })
        .catch(handleError)
    },
    getComments({ commit, dispatch }, task) {
      api('boards/' + task.boardId + '/list/' + task.listId +'/tasks/' + task._id)
        .then(res => {
          console.log(res)
          commit('setActiveComments', res.data.data)
        })
        .catch(handleError)
    },
    createTask({ commit, dispatch }, task) {
      api.post('tasks', task)
        .then(res => {
          dispatch('getTask', {boardId: task.boardId, _id: task.listId})
        })
        .catch(handleError)
    },
    removeTask({ commit, dispatch }, task) {
      console.log("sending to server")
      api.delete('tasks/' + task._id)
        .then(res => {
          console.log("sending to getList")
          dispatch('getTask', {boardId: task.boardId, _id: task.listId})
        })
        .catch(handleError)
    },
    createComment({ commit, dispatch }, comment) {
      api.post('comments', comment)
        .then(res => {
          console.log('createResponse ', res)
          comment._id = comment.taskId;
          dispatch('getComments', comment)
        })
        .catch(handleError)
    },
    removeComment({ commit, dispatch }, comment) {
      api.delete('comments/' + comment._id)
        .then(res => {
          dispatch('getComments', {boardId: comment.boardId, listId: comment.listId, _id: comment.taskId})
        })
        .catch(handleError)
    }
  }
})

