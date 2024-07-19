<template>
  <div
    v-if="isVisible"
    @click="closeModalWhenClickOutside"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75"
  >
    <div class="bg-white rounded-lg shadow-lg overflow-hidden w-96">
      <div
        class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Add New Task
        </h3>
        <button
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          @click="closeModal"
        >
          <span>X</span>
        </button>
      </div>
      <form class="p-4" @submit.prevent="handleSubmit">
        <section class="col-span-2">
          <label
            for="title"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Title</label
          >
          <input
            type="text"
            v-model="taskTitle"
            name="title"
            id="title"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Enter Any Task"
            required
            @input="checkValidation"
            maxlength="50"
          />
          <p v-if="taskTitleError" class="text-red-600 mt-2 text-sm">
            {{ taskTitleError }}
          </p>
        </section>
        <div class="pt-6 flex justify-end gap-5">
          <button
            @click="closeModal"
            class="px-3 py-1 bg-blue-600 text-white rounded"
            type="button"
          >
            Close
          </button>
          <button
            class="px-3 py-1 bg-green-600 text-white rounded"
            type="submit"
            :disabled="taskTitleError ? true : false"
            :class="taskTitleError && 'cursor-not-allowed'"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToDoTaskStore } from "../store/ToDoTaskStore";
import { v4 as uuid } from "uuid";

const toDoTaskStore = useToDoTaskStore();
const isVisible = ref(false);
const taskTitle = ref("");
const taskTitleError = ref("");

const showModal = () => {
  taskTitle.value = "";
  taskTitleError.value = "";
  isVisible.value = true;
};

const closeModal = () => {
  isVisible.value = false;
};

const handleSubmit = () => {
  if (taskTitle.value) {
    const payload = {
      id: uuid(),
      title: taskTitle.value,
      completed: false,
    };
    toDoTaskStore.addTask(payload);
    isVisible.value = false;
    taskTitle.value = "";
  }
};

const checkValidation = () => {
  if (!taskTitle.value || taskTitle.value.trim() === "") {
    taskTitleError.value = "Title is required";
  } else {
    taskTitleError.value = "";
  }
};

const closeModalWhenClickOutside = (event) => {
  if (event.target === event.currentTarget) {
    isVisible.value = false;
  }
};

defineExpose({
  showModal,
});
</script>
