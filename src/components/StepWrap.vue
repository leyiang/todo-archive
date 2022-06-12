<style>
.finished {
    color: #999;
    text-decoration: line-through;
}

.finished input {
    text-decoration: line-through;
}
</style>

<template>
    <div
        :class="finish ? 'finished' : '' "
        ref="el"
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";

defineProps({
    finish: {
        type: Boolean,
        default: false,
    }
});

const el = ref(null);

defineExpose({
    el
})
</script>