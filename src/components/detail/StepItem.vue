<template>
    <div class="flex py-4">
        <IconColumn>
            <FinishButton
                class="text-xl"
                :finish="step.finish"
            />
        </IconColumn>

        <GhostInput
            :value="step.name"
        />
    </div>
</template>

<script setup>
    import IconColumn from "@/components/IconColumn.vue"
    import FinishButton from "@/components/FinishButton.vue"
    import GhostInput from "@/components/GhostInput.vue"
    import { defineProps } from "vue";
    import Step from "@/core/model/Step";

    defineProps({
        step: {
            type: Step,
            required: true
        }
    })
</script>