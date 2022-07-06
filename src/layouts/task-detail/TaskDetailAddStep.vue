<script setup lang="ts">
import {adapter, useTodoStore} from "@/stores/TodoStore";
import Folder from "@/core/model/folder/Folder";
import type {rawStep, rawTask} from "@/core/model/rawTypes";
import Task from "@/core/model/Task";
import Step from "@/core/model/Step";

const todoStore = useTodoStore();

function addNewStep(e: KeyboardEvent) {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    if( todoStore.activeTask instanceof Task ) {
        adapter.addStep(value, todoStore.activeTask.id).then((raw: rawStep) => {
            const step = Step.Load( raw );
            todoStore.activeTask?.steps.push( step );
        });
    }

    target.value = "";
}
</script>

<template>
    <input
        type="text"
        @keydown.enter="addNewStep"
    >
</template>