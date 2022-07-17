<script setup lang="ts">
import FolderList from "@/layouts/folder-list/FolderList.vue"
import TaskListWarp from "@/layouts/task-list/TaskListWrap.vue"
import TaskDetail from "@/layouts/task-detail/TaskDetail.vue";
import {useTodoStore} from "@/stores/TodoStore";
import ContextMenu from "@/components/common/context-menu/ContextMenu.vue";
import Modal from "@/components/common/Modal.vue";

const todoStore = useTodoStore();
todoStore.init();
</script>

<template>
    <div class="todo-app flex h-full">
        <FolderList
            class="min-w-300px"
        />

        <TaskListWarp
            data-test="task-list"

            class="flex-1"
            style="background-color: #73d197"
        />

        <TaskDetail
            data-test="task-detail"
            v-if="todoStore.activeTask"
            :task="todoStore.activeTask"
            class="w-300px"
        />

        <ContextMenu
            data-test="context-menu"
        />
    </div>
</template>
