<template>
  <section
    class="flex items-center justify-between gap-5 px-5 py-3 shadow-lg rounded-md w-full bg-white"
    :class="{ completed: task.completed }"
  >
    <h2 class="flex-1 cursor-pointer" @click="goToTaskDetail(task.id)">
      {{ task.title }}
    </h2>

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
import { useRouter } from "vue-router";
const props = defineProps({
  task: { id: Number, title: String, completed: Boolean },
});

const emits = defineEmits(["editTask"]);

const router = useRouter();

const goToTaskDetail = (taskId) => {
  router.push(`/task/${taskId}`);
};

const updateTask = () => {
  emits("editTask", props.task);
};
</script>

<style lang="css" scoped>
.completed {
  text-decoration: line-through;
}
</style>
