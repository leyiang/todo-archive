<script setup lang="ts">
import FolderList from "@/layouts/folder-list/FolderList.vue"
import TaskList from "@/layouts/task-list/TaskList.vue"
import TaskDetail from "@/layouts/task-detail/TaskDetail.vue";
import {useTodoStore} from "@/stores/TodoStore";

const todoStore = useTodoStore();
todoStore.init();

</script>

<template>
    <FolderList />
    <TaskList />

    <TaskDetail
        v-if="todoStore.activeTask"
        :task="todoStore.activeTask"
    />
</template>
