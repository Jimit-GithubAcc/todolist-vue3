import { defineStore } from "pinia";
import { initialTasks } from "./../constants";

export const useToDoTaskStore = defineStore("todo", {
  state: () => ({
    tasks: initialTasks,
  }),
  getters: {
    sortTasksAsCompleted(state) {
      return state.tasks.sort((a, b) => a.completed - b.completed);
    },
    getCompletedTasks(state) {
      return state.tasks.filter((task) => task.completed);
    },
    getPendingTasks(state) {
      return state.tasks.filter((task) => !task.completed);
    },
  },
});
