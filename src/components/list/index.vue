<script setup>
import TaskItem from "./TaskItem.vue";
</script>

<template>
    <div class="task-list-wrap p-5 flex flex-col gap-8">
        <header class="list-header">
            <h2 class="text-4xl font-bold text-white">Title</h2>
        </header>

        <div class="flex flex-col gap-2 task-list flex-1 overflow-y-scroll">
            <TaskItem v-for="i in 20" />
        </div>

        <input type="text" class="flex p-4 rounded w-full bg-green-900" placeholder="Add a task">
    </div>
</template>
