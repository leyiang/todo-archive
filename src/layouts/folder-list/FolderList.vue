<script setup lang="ts">
import {useTodoStore} from "@/stores/TodoStore";
import FolderItem from "@/layouts/folder-list/FolderItem.vue";

const todoStore = useTodoStore();
</script>

<template>
    <aside>
        <FolderItem
            v-for="folder in todoStore.folders"
            :folder="folder"
        />
    </aside>
</template>