<script setup lang="ts">
import {adapter, useTodoStore} from "@/stores/TodoStore";
import type {rawFolder} from "@/core/model/rawTypes";
import Folder from "@/core/model/folder/Folder";

const todoStore = useTodoStore();
function addNewFolder( e: KeyboardEvent ) {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    adapter.addFolder(value).then( (raw: rawFolder) => {
        const folder = Folder.Load( raw );
        todoStore.addFolder( folder );
    });

    target.value = "";
}
</script>

<template>
    <input
        type="text"
        @keydown.enter="addNewFolder"
    >
</template>