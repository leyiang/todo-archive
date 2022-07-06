<script setup lang="ts">
import FolderList from "@/layouts/folder-list/FolderList.vue"
import TaskList from "@/layouts/task-list/TaskList.vue"
import {useTodoStore} from "@/stores/TodoStore";

const todoStore = useTodoStore();
todoStore.init();
</script>

<template>
    <FolderList />
    <TaskList />
</template>
