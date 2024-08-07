import { defineStore } from "pinia";
import { initialTasks } from "./../constants";

export const useToDoTaskStore = defineStore("todo", {
  state: () => ({
    tasks: initialTasks,
  }),
  getters: {
    // sortTasksAsCompleted(state) {
    //   return state.tasks.sort((a, b) => a.completed - b.completed);
    // },
    sortTasksAsCompleted(state) {
      return state.tasks;
    },
    getCompletedTasks(state) {
      return state.tasks.filter((task) => task.completed);
    },
    getPendingTasks(state) {
      return state.tasks.filter((task) => !task.completed);
    },
    countTotalTasks(state) {
      return state.tasks.length;
    },
  },
  actions: {
    addTask(task) {
      this.tasks.push(task);
    },
    updateTask(newTask) {
      const index = this.tasks.findIndex((task) => task.id === newTask.id);
      if (index !== -1) {
        this.tasks[index] = newTask;
      }
    },
    searchTask(search) {
      if (search.length > 3) {
        this.tasks = this.tasks.filter((task) =>
          task.title.toLowerCase().includes(search.toLowerCase())
        );
      } else {
        this.tasks = initialTasks;
      }
    },
    dragAndDropTasks(dragOrder) {
      this.tasks = dragOrder;
    },
  },
});
