<style>
.icon-column {
    width: 40px; /* Default Width */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
</style>

<template>
    <div
        class="icon-column"
        :style="style"
    >
        <slot ref="child"></slot>
    </div>
</template>

<script setup>
import { inject, computed } from "vue";

/**
 * Get Width From A n-level parent
 * So all icon-column inside that container
 * Will Have a same width
 * @type {number}
 */
let width = inject("icon-column-width", 40);

/**
 * Get Referenced By DOM
 * @type {ComputedRef<{width: string}>}
 */
const style = computed(() => ({
    "width": width + "px",
}));
</script>