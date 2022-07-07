<script setup lang="ts">
import {useTodoStore} from "@/stores/TodoStore";
import FolderItem from "@/layouts/folder-list/FolderItem.vue";
import FolderListAddNew from "./FolderListAddNew.vue";

const todoStore = useTodoStore();
</script>

<template>
    <aside
        class="flex flex-col p-1rem"
    >
        <div class="list flex-1 flex flex-col">
            <FolderItem
                v-for="folder in todoStore.folders"
                :folder="folder"
            />
        </div>

        <FolderListAddNew />
    </aside>
</template>