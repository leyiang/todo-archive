<script setup lang="ts">
import Folder from "@/core/model/folder/Folder";
import {useTodoStore} from "@/stores/TodoStore";

const todoStore = useTodoStore();
const props = defineProps({
    folder: {
        type: Folder,
        required: true,
    }
});

function setActive() {
    todoStore.setActiveFolder( props.folder );
}
</script>

<template>
    <button
        class="folder-item"
        @click="setActive"
    >{{ folder.name }}</button>
</template>