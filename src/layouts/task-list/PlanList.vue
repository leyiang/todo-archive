<script setup lang="ts">
import StepPlanItem from "./plan/StepPlanItem.vue";
import TaskPlanItem from "./plan/TaskPlanItem.vue";
import Task from "@/core/model/Task";
import Step from "@/core/model/Step";
import { toRaw } from "vue";
import { adapter } from "@/stores/TodoStore";


type Plan = Task | Step;
function isTask( plan: Plan ) : plan is Task {
    return plan instanceof Task;
}

function isStep( plan: Plan ) : plan is Step {
    return plan instanceof Step;
}

const props = defineProps<{
    plans: Plan[]
}>();

let oldPriority = 0;
let currentDraggingPlan: Plan | null = null;
let endDraggingPlan: Plan | null = null;

function onDragStart( plan: Plan ) {
    currentDraggingPlan = plan;
    oldPriority = plan.priority;
}

function onDragEnter( plan: Plan ) {
    if( currentDraggingPlan === null ) return;
    if( plan === currentDraggingPlan ) return;

    endDraggingPlan = plan;
    currentDraggingPlan.priority = endDraggingPlan.priority + 1;
}

function onDrop() {
    const plan = toRaw( currentDraggingPlan );
    
    if( plan === null ) return;

    console.log( isStep(plan) );;
    
    if( isTask(plan) ) {
        adapter.setTaskProp( plan.id, "priority", plan.priority ).then( _ => {
            // Nothing to do
        });
    } else if( isStep(plan) ) {
        adapter.setStepProp( plan.id, "priority", plan.priority ).then( _ => {
            // Nothing to do
        });
    }
}
</script>

<template>
    <template v-for="plan in plans">
        <TaskPlanItem
            v-if="isTask( plan )"
            :key="plan.id"
            :task="plan"

            draggable="true"
            @dragstart="onDragStart( plan )"
            @dragenter.prevent="onDragEnter( plan )"
            @dragover.prevent=""
            @drop="onDrop"
        />

        <StepPlanItem
            v-else-if="isStep( plan )"
            :key="plan.id"
            :step="plan"

            draggable="true"
            @dragstart="onDragStart( plan )"
            @dragenter.prevent="onDragEnter( plan )"
            @dragover.prevent=""
            @drop="onDrop"
        />
    </template>
</template>