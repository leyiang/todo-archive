<script setup lang="ts">
import FolderList from "@/layouts/folder-list/FolderList.vue"
import TaskList from "@/layouts/task-list/TaskList.vue"
import TaskDetail from "@/layouts/task-detail/TaskDetail.vue";
import {useTodoStore} from "@/stores/TodoStore";
import ContextMenu from "@/components/common/context-menu/ContextMenu.vue";

const todoStore = useTodoStore();
todoStore.init();
</script>

<template>
    <div class="todo-app flex h-full">
        <FolderList
            class="min-w-300px"
        />

        <TaskList
            class="flex-1 bg-green-400"
        />

        <TaskDetail
            v-if="todoStore.activeTask"
            :task="todoStore.activeTask"
            class="w-300px"
        />

        <ContextMenu
            data-test="context-menu"
        />
    </div>
</template>
