<script setup lang="ts">
import {adapter, useTodoStore} from "@/stores/TodoStore";
import Folder from "@/core/model/folder/Folder";
import type {rawTask} from "@/core/model/rawTypes";
import Task from "@/core/model/Task";

const todoStore = useTodoStore();

function addNewTask(e: KeyboardEvent) {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    if( todoStore.activeFolder instanceof Folder ) {
        adapter.addTask(value, todoStore.activeFolder.id).then((raw: rawTask) => {
            const task = Task.Load( raw );
            todoStore.activeFolder?.plans.push( task );
        });
    }

    target.value = "";
}
</script>

<template>
    <input
        data-test="task-add-new"
        type="text"
        class="
             p-1rem rounded border-transparent placeholder-gray-100
             text-white text-4 outline-none bg-gray-900/30 font-semibold
        "
        @keydown.enter="addNewTask"
        placeholder="Add new Task :)"
    >
</template>