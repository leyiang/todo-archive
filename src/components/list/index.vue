<style>
.task-list-wrap {
    background-color: #73d197;
}
.task-list {
    overflow-y: scroll;
    padding-right: 5px;
}

.task-list::-webkit-scrollbar {
    width: 8px;
    margin-left: 1rem;
}

.task-list::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.3);
}
</style>

<template>
    <div class="task-list-wrap p-5 flex flex-col gap-8">
        <header class="list-header">
            <h2 class="text-4xl font-bold text-white">Title</h2>
        </header>

        <div class="task-list flex flex-col gap-2 task-list flex-1">
            <TaskItem v-for="i in 15" />
        </div>

        <AddNewInput />
    </div>
</template>

<script setup>
import TaskItem from "./TaskItem.vue";
import AddNewInput from "@/components/AddNewInput.vue";
</script>