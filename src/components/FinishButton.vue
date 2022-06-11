<template>
    <button class="finish-button">
        <Icon :icon="iconType" />
    </button>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { defineProps, computed } from "vue";

const props = defineProps({
    finish: {
        type: Boolean,
        default: false,
    }
});

const iconType = computed(() => {
    return props.finish
        ? "ic:outline-check-circle"
        : "ic:outline-circle";
});
</script>
