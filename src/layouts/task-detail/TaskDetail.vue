<script setup lang="ts">
import {computed} from "vue";
import TaskDetailAddStep from "./TaskDetailAddStep.vue";
import Task from "@/core/model/Task";
import StepItem from "./StepItem.vue";

const props = defineProps({
    task: {
        type: Task,
        required: true
    }
});

const steps = computed(() => {
    const steps = props.task.steps.slice();
    return steps;
});
</script>

<template>
    <aside class="task-detail">
        <StepItem
            v-for="step in steps"
            :key="step.id"
            :step="step"
        />

        <TaskDetailAddStep />
    </aside>
</template>