<script setup lang="ts">
import {useTodoStore} from "@/stores/TodoStore";
import TaskListAddNew from "./TaskListAddNew.vue";

const todoStore = useTodoStore();
</script>

<template>
    <main>
        <div v-if="todoStore.activeFolder">
            <div v-for="plan in todoStore.activeFolder.plans">{{ plan.name }}</div>

            <TaskListAddNew />
        </div>
    </main>
</template>