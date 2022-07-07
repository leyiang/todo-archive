<script setup lang="ts">
import Step from "@/core/model/Step";
import GhostInput from "@/components/common/GhostInput.vue";

const props = defineProps({
    step: {
        type: Step,
        required: true
    }
})
</script>

<template>
    <div class="step-item">
        <button>
            <Icon></Icon>
        </button>
        <GhostInput
            :value="step.name"
        />
    </div>
</template>