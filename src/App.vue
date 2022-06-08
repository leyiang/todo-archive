<script setup lang="ts">
import Sidebar from "./components/sidebar/index.vue";
import TaskList from "./components/list/index.vue";
</script>

<template>
    <main class="main-content flex h-screen">
        <Sidebar class="w-1/4" />
        <TaskList class="flex-1 bg-green-300" />
    </main>
</template>

<style>

</style>
