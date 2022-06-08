<style>
.todo-aside {
    max-width: 340px;
}

.todo-aside .sidebar-item:first-of-type {
    margin-top: -10px;
}
</style>

<template>
    <aside class="todo-aside py-5">
        <div class="flex flex-col">
            <ListItem v-for="i in 10" />        
        </div>
    </aside>
</template>

<script setup>
import ListItem from "./ListItem.vue";
</script>
