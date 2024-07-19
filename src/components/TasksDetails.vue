<template>
  <section
    class="flex items-center justify-between gap-5 px-5 py-3 shadow-lg rounded-md w-full bg-white"
    :class="{ completed: task.completed }"
  >
    <h2>{{ task.title }}</h2>
    <input
      type="text"
      v-model="task.title"
      class="border border-gray-500 px-3 py-2"
      placeholder="Enter Any Task"
      required
    />

    <section class="flex gap-3">
      <button title="Edit Task" @click="updateTask(task)">
        <PencilSquareIcon class="w-5 h-5 text-blue-600" />
      </button>
      <input
        type="checkbox"
        name="completed"
        class="cursor-pointer"
        v-model="task.completed"
        :title="task.completed ? 'Mark As Pending' : 'Mark As Complete'"
      />
    </section>
  </section>
</template>

<script setup>
import { PencilSquareIcon } from "@heroicons/vue/24/outline";
defineProps({
  task: { id: Number, title: String, completed: Boolean },
});

const emits = defineEmits(["editTask"]);

const updateTask = () => {
  emits("editTask", task);
};
</script>

<style lang="css" scoped>
.completed {
  text-decoration: line-through;
}
</style>
