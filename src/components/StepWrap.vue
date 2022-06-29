<style>

</style>

<template>
    <div
        :class="finish ? 'finished' : '' "
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
defineProps({
    finish: {
        type: Boolean,
        default: false,
    }
});
</script>