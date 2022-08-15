<script setup lang="ts">
defineProps({
    modelValue: {
        type: String
    }
});
</script>

<template>
    <input
        type="text"
        border-gray-300
        border-1
        rounded
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    >
</template>