<script setup lang="ts">
import Step from "@/core/model/Step";
import GhostInput from "@/components/common/GhostInput.vue";
import { Icon } from "@iconify/vue"
import useFinishIcon from "@/composables/useFinishIcon";

const props = defineProps({
    step: {
        type: Step,
        required: true
    }
});

const finishIcon = useFinishIcon(props.step);
</script>

<template>
    <div class="step-item flex items-center text-1rem py-3">
        <button
            class="flex justify-between items-between text-xl mr-2"
        >
            <Icon :icon="finishIcon"></Icon>
        </button>

        <GhostInput
            :value="step.name"
        />
    </div>
</template>