<script setup lang="ts">
import StepPlanItem from "./plan/StepPlanItem.vue";
import TaskPlanItem from "./plan/TaskPlanItem.vue";
import Task from "@/core/model/Task";
import Step from "@/core/model/Step";

function isTask( plan: Task | Step ) : plan is Task {
    return plan instanceof Task;
}

function isStep( plan: Task | Step ) : plan is Step {
    return plan instanceof Step;
}

const props = defineProps<{
    plans: (Task | Step)[]
}>();

</script>

<template>
    <template v-for="plan in plans">
        <TaskPlanItem
            v-if="isTask( plan )"
            :key="plan.id"
            :task="plan"
        />

        <StepPlanItem
            v-else-if="isStep( plan )"
            :key="plan.id"
            :step="plan"
        />
    </template>
</template>