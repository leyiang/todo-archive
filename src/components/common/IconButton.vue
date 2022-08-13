<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
    icon: string
}>();
</script>

<template>
    <button
        class="flex items-center justify-center w-36px h-36px b-none rounded-full bg-transparent text-xl"
        hover="bg-gray-200"
    >
        <Icon :icon="icon"></Icon>
    </button>
</template>