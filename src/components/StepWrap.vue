<style>
.finished {
    color: #999;
    text-decoration: line-through;
}

.finished input,
.finished textarea{
    text-decoration: line-through;
}

</style>

<template>
    <div
        :class="finish ? 'finished' : '' "
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
    finish: {
        type: Boolean,
        default: false,
    }
});
</script>