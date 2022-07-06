<script setup lang="ts">
import Task from "@/core/model/Task";
import {useTodoStore} from "@/stores/TodoStore";

const todoStore = useTodoStore();
const props = defineProps({
    task: {
        type: Task,
        required: true
    }
});

function setActive() {
    todoStore.setActiveTask( props.task );
}
</script>

<template>
    <button
        class="task-item"
        @click="setActive"
    >{{ task.name }}</button>
</template>