import { defineStore } from "pinia";
import { initialTasks } from "./../constants";

export const useToDoTaskStore = defineStore("todo", {
  state: () => ({
    tasks: initialTasks,
  }),
});
