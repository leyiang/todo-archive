<script setup lang="ts">

</script>

<template>
    <ul
        class="context-menu flex-col bg-white absolute py-8px px-0 border border-gray-300 m0"
    >
        <slot></slot>
    </ul>
</template>

<style>
.context-menu {
    width: var(--width);
}
</style>