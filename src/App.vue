<template>
  <div class="container mx-auto pb-10">
    <h1
      class="text-xl sm:text-3xl text-center font-bold h-24 place-content-center bg-[#ffd859]"
    >
      To Do List App
    </h1>

    <!-- Search Tasks -->
    <section class="relative max-w-4xl mx-auto mt-5">
      <input
        type="text"
        placeholder="Search Any Task"
        class="w-full p-2 pl-10 pr-4 rounded-lg border border-gray-300 relative"
        v-model="searchTask"
        @input="handleTaskSearch"
      />
      <MagnifyingGlassIcon
        class="absolute w-5 h-5 transform text-gray-400 right-0 mx-5 -translate-y-1/2 top-1/2"
      />
    </section>

    <section class="flex items-center justify-between mt-10 max-w-4xl mx-auto">
      <!-- Add Task -->
      <button
        class="bg-orange-500 hover:bg-orange-600 filter-btn"
        @click="openAddTaskModal"
      >
        Add New Task
      </button>
      <AddTaskModal ref="addTaskModal" />

      <!-- Filter Tasks Section -->
      <section class="flex gap-5 justify-end">
        <button
          @click="taskStatus = 'all'"
          class="bg-blue-500 hover:bg-blue-600 filter-btn"
        >
          All Tasks
        </button>
        <button
          @click="taskStatus = 'completed'"
          class="bg-green-500 hover:bg-green-600 filter-btn"
        >
          Completed Tasks
        </button>
        <button
          @click="taskStatus = 'pending'"
          class="bg-red-500 hover:bg-red-600 filter-btn"
        >
          Pending Tasks
        </button>
      </section>
    </section>

    <section v-if="taskStatus === 'all'">
      <h2>All Tasks - {{ countTotalTasks }}</h2>
      <article class="mt-5 flex gap-5 flex-col mx-auto max-w-4xl items-center">
        <tasks-details
          v-for="task in sortTasksAsCompleted"
          :key="task.id"
          :task="task"
        />
      </article>
    </section>

    <section v-else-if="taskStatus === 'completed'">
      <h2>Completed Tasks - {{ getCompletedTasks.length }}</h2>
      <article class="mt-5 flex gap-5 flex-col mx-auto max-w-4xl items-center">
        <tasks-details
          v-for="task in getCompletedTasks"
          :key="task.id"
          :task="task"
        />
      </article>
    </section>

    <section v-else>
      <h2>Pending Tasks - {{ getPendingTasks.length }}</h2>
      <article
        class="mt-5 flex gap-5 flex-col mx-auto max-w-4xl items-center"
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
import AddTaskModal from "./components/AddTaskModal.vue";
import { storeToRefs } from "pinia";
import { useToDoTaskStore } from "./store/ToDoTaskStore";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";

const {
  tasks,
  sortTasksAsCompleted,
  getCompletedTasks,
  getPendingTasks,
  countTotalTasks,
} = storeToRefs(useToDoTaskStore());
const toDoTaskStore = useToDoTaskStore();

const taskStatus = ref("all");
const addTaskModal = ref(null);
const searchTask = ref("");

const openAddTaskModal = () => {
  addTaskModal.value.showModal();
};

const handleTaskSearch = () => {
  toDoTaskStore.searchTask(searchTask.value);
};

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
.filter-btn {
  padding: 10px;
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
