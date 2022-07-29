<script setup lang="ts">
import type { menuSpecItem } from './ContextMenuData';

const props = defineProps<{
    spec: menuSpecItem
}>();

const emit = defineEmits(["close"]);

function triggerAction() {
    props.spec.action?.();
    emit("close");
}
</script>

<template>
    <button
        btn-reset
        class="px-1rem py-5px hover:bg-gray-300 text-left"
        @click="triggerAction"
    >
        <slot></slot>
    </button>
</template>
