<script setup lang="ts">
import Sidebar from "./components/sidebar/index.vue";
import TaskList from "./components/list/index.vue";
import TaskDetail from "./components/detail/index.vue";
</script>

<template>
    <main class="main-content flex h-screen">
        <Sidebar class="w-1/4" />
        <TaskList class="flex-1" />
        <TaskDetail
            class="w-1/4"
        />
    </main>
</template>

<style>

</style>