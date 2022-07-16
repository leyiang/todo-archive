<script setup lang="ts">
import {useTodoStore} from "@/stores/TodoStore";
import TaskList from "./TaskList.vue";
const todoStore = useTodoStore();
</script>

<template>
    <main class="task-list flex flex-col px-1rem py-2rem gap-1rem">
        <template v-if="todoStore.activeFolder !== null">
            <TaskList
                :folder="todoStore.activeFolder"
            />
        </template>

        <template v-else>
            <div class="flex items-center justify-center h-full flex-col">
                <span class="text-8xl mb-2rem">😃</span>
                <h2 class="font-bold text-white text-4xl text-shadow-md">Let's select a folder :)</h2>
            </div>
        </template>
    </main>
</template>