<script setup lang="ts">
import {isNameEmpty} from "@/shared/utils";

const emit = defineEmits(["add"]);

function onEnter( e: KeyboardEvent ) {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    /**
     * Clear Input
     */
    target.value = "";

    /**
     * Empty Value will not trigger @add Event
     */
    if( isNameEmpty(value) ) return;

    /**
     * Reset Input
     */
    emit("add", value);
}
</script>

<template>
    <input
        type="text"
        @keydown.enter="onEnter"
    >
</template>