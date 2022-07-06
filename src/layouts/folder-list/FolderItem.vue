<script setup lang="ts">
import Folder from "@/core/model/folder/Folder";

const props = defineProps({
    folder: {
        type: Folder,
        required: true,
    }
});
</script>

<template>
    <button
        class="folder-item"
    >{{ folder.name }}</button>
</template>