<script setup lang="ts">
import FolderList from "@/layouts/folder-list/FolderList.vue"
import UserMeta from "@/layouts/user-meta/UserMeta.vue"
import TaskListWarp from "@/layouts/task-list/TaskListWrap.vue"
import TaskDetail from "@/layouts/task-detail/TaskDetail.vue";
import {useTodoStore} from "@/stores/TodoStore";
import ContextMenu from "@/components/common/context-menu/ContextMenu.vue";

const todoStore = useTodoStore();
todoStore.init();

/**
 * For Dev
 */
window.exportData = todoStore.exportData;
</script>

<template>
    <div class="todo-app flex h-full">
        <aside class="todo-aside flex flex-col">
            <UserMeta />

            <FolderList
                class="min-w-300px flex-1"
            />
        </aside>

        <TaskListWarp
            data-test="task-list"

            class="flex-1"
            style="background-color: #73d197"
        />

        <TaskDetail
            data-test="task-detail"
            v-if="todoStore.activeTask"
            :key="todoStore.activeTask?.id"
            :task="todoStore.activeTask"
            class="w-300px"
        />

        <ContextMenu
            data-test="context-menu"
        />
    </div>
</template>
