<script setup lang="ts">
import Sidebar from "./components/sidebar/index.vue";
import TaskList from "./components/list/index.vue";
import TaskDetail from "./components/detail/index.vue";
import ContextMenu from "./components/context_menu/menu.vue";
import {useTodoStore} from "@/stores/todo";

const todo = useTodoStore();
// todo.exportData();

if( typeof globalThis === "object" ) {
    // Export this api to globalThis
    // So that we may recue data when emergency
    globalThis.exportData = () : void => {
        todo.exportData();
    };
}
</script>

<template>
    <main class="main-content flex h-screen">
        <Sidebar class="w-1/4"/>
        <TaskList class="flex-1" />

        <TaskDetail
            class="w-1/3"
            v-if="todo.task"
            :task="todo.task"
        />

        <context-menu />
    </main>
</template>

<style>

</style>