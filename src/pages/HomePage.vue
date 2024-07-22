<template>
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
    <TaskModal ref="taskModal" :task="currentTask" @saveTask="handleSaveTask" />

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
      <tasks-list
        v-for="(task, idx) in sortTasksAsCompleted"
        :key="task.id"
        :task="task"
        :idx="idx"
        @editTask="openEditTaskModal"
        @dragstart="handleDragStart"
        @dragover="handleDragEnd"
        @drop="handleDrop"
      />
    </article>
  </section>

  <section v-else-if="taskStatus === 'completed'">
    <h2>Completed Tasks - {{ getCompletedTasks.length }}</h2>
    <article class="mt-5 flex gap-5 flex-col mx-auto max-w-4xl items-center">
      <tasks-list
        v-for="(task, idx) in getCompletedTasks"
        :key="task.id"
        :task="task"
        :idx="idx"
        @editTask="openEditTaskModal"
        @dragstart="handleDragStart"
        @dragover="handleDragEnd"
        @drop="handleDrop"
      />
    </article>
  </section>

  <section v-else>
    <h2>Pending Tasks - {{ getPendingTasks.length }}</h2>
    <article
      class="mt-5 flex gap-5 flex-col mx-auto max-w-4xl items-center"
      v-if="taskStatus === 'pending'"
    >
      <tasks-list
        v-for="(task, idx) in getPendingTasks"
        :key="task.id"
        :task="task"
        :idx="idx"
        @editTask="openEditTaskModal"
        @dragstart="handleDragStart"
        @dragover="handleDragEnd"
        @drop="handleDrop"
      />
    </article>
  </section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useToDoTaskStore } from "../store/ToDoTaskStore";
import TasksList from "../components/TasksList.vue";
import TaskModal from "../components/TaskModal.vue";
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
const taskModal = ref(null);
const searchTask = ref("");
const currentTask = ref(null);
let draggedIndex = null;

const openAddTaskModal = () => {
  currentTask.value = null;
  taskModal.value.showModal();
};

const openEditTaskModal = (task) => {
  currentTask.value = task;
  taskModal.value.showModal();
};

const handleTaskSearch = () => {
  toDoTaskStore.searchTask(searchTask.value);
};

const handleSaveTask = (task) => {
  if (currentTask.value) {
    toDoTaskStore.updateTask(task);
  } else {
    toDoTaskStore.addTask(task);
  }
};

const handleDragStart = (e, id) => {
  draggedIndex = id;
  e.dataTransfer.effectAllowed = "move";
};

const handleDragEnd = (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
};

const handleDrop = (e, id) => {
  e.preventDefault();
  if (draggedIndex !== null && draggedIndex !== id) {
    const newOrder = [...tasks.value];
    const draggedItem = newOrder.splice(draggedIndex, 1)[0];
    newOrder.splice(id, 0, draggedItem);
    toDoTaskStore.dragAndDropTasks(newOrder);
  }
  draggedIndex = null;
};
</script>

<style scoped>
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
