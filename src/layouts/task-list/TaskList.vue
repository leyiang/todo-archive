<script setup lang="ts">
import {useTodoStore} from "@/stores/TodoStore";

const todoStore = useTodoStore();
</script>

<template>
    <div v-if="todoStore.activeFolder">
        <div v-for="plan in todoStore.activeFolder.plans">{{ plan.name }}</div>
    </div>
</template>