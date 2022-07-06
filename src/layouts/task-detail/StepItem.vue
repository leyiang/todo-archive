<script setup lang="ts">
import Step from "@/core/model/Step";

const props = defineProps({
    step: {
        type: Step,
        required: true
    }
})
</script>

<template>
    <span>{{ step.name }}</span>
</template>