<script setup></script>

<template>
  <div class="container mx-auto">
    <h1
      class="text-xl sm:text-3xl text-center font-bold h-24 place-content-center bg-[#ffd859]"
    >
      To Do List App
    </h1>

    <!-- Filter Tasks Section -->
    <section class="flex gap-5 mt-10 justify-center">
      <button @click="taskStatus = 'all'" class="bg-blue-500 hover:bg-blue-600">
        All Tasks
      </button>
      <button
        @click="taskStatus = 'completed'"
        class="bg-green-500 hover:bg-green-600"
      >
        Completed Tasks
      </button>
      <button
        @click="taskStatus = 'pending'"
        class="bg-red-500 hover:bg-red-600"
      >
        Pending Tasks
      </button>
    </section>

    <section v-if="taskStatus === 'all'">
      <h2>All Tasks</h2>
      <article class="mt-5 flex gap-10 flex-col mx-auto max-w-2xl items-center">
        <tasks-details
          v-for="task in sortTasksAsCompleted"
          :key="task.id"
          :task="task"
        />
      </article>
    </section>

    <section v-else-if="taskStatus === 'completed'">
      <h2>Completed Tasks</h2>
      <article class="mt-5 flex gap-10 flex-col mx-auto max-w-2xl items-center">
        <tasks-details
          v-for="task in getCompletedTasks"
          :key="task.id"
          :task="task"
        />
      </article>
    </section>

    <section v-else>
      <h2>Pending Tasks</h2>
      <article
        class="mt-5 flex gap-10 flex-col mx-auto max-w-2xl items-center"
        v-if="taskStatus === 'pending'"
      >
        <tasks-details
          v-for="task in getPendingTasks"
          :key="task.id"
          :task="task"
        />
      </article>
    </section>
  </div>
</template>

<script setup>
import TasksDetails from "./components/TasksDetails.vue";
import { storeToRefs } from "pinia";
import { useToDoTaskStore } from "./store/ToDoTaskStore";
import { ref } from "vue";

const { tasks, sortTasksAsCompleted, getCompletedTasks, getPendingTasks } =
  storeToRefs(useToDoTaskStore());

const taskStatus = ref("all");

// const
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
button {
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  min-width: 100px;
  transition: all 0.3s ease-in-out;
}

.container h2 {
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
</style>
