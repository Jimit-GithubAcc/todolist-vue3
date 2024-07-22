<template>
  <section class="mb-5"></section>
  <button
    class="bg-blue-600 text-white px-3 py-2 text-center hover:bg-blue-700 transition-all duration-500 ease-in-out hover:scale-95"
    @click="$router.push('/')"
  >
    Go Back
  </button>
  <div v-if="task" class="mt-10 shadow-md max-w-3xl mx-auto bg-white p-5">
    <h1 class="text-center text-xl font-medium mb-5">Task Details</h1>
    <p><strong>ID:</strong> {{ task.id }}</p>
    <p><strong>Title:</strong> {{ task.title }}</p>
    <p><strong>Completed:</strong> {{ task.completed ? "Yes" : "No" }}</p>
  </div>
  <div v-else>
    <p>Task not found</p>
  </div>
</template>

<script>
export default {
  name: "TaskDetail",
};
</script>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useToDoTaskStore } from "../store/ToDoTaskStore";

const route = useRoute();
const taskStore = useToDoTaskStore();

const taskId = route.params.id;
const task = ref(null);

const fetchTask = () => {
  const tasks = taskStore.tasks;
  task.value = tasks.find((t) => t.id == taskId);
};

onMounted(() => {
  fetchTask();
});
</script>
