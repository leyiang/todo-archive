<style scoped>
.task-list-wrap {
    background-color: #73d197;
}
</style>

<template>
    <div
        class="task-list-wrap p-5"
    >
        <ListContent
            v-if="todo.list"
            :list="todo.list"
        />
    </div>
</template>

<script setup lang="ts">
import {provide} from "vue";
import ListContent from "./ListContent.vue";
import {useTodoStore} from "@/stores/todo";

const todo = useTodoStore();
provide("icon-column-width", 50);

function hideTaskDetail() {
    todo.toggleTask( null );
}
</script>