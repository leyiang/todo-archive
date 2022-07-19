<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
    show: boolean,
}>();
</script>

<template>
    <button
        class="
         bg-gray-700 text-white py-10px px-1rem rounded flex items-center
         mr-auto
        "
        justify-between
        btn-reset
    >
        <span class="mr-9px">Completed</span>

        <Icon
            class="text-xl"
            :icon="show ? 'ic:baseline-keyboard-arrow-up' : 'ic:baseline-keyboard-arrow-down'"
        />
    </button>
</template>