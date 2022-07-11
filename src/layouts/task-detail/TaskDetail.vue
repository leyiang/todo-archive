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
    <aside
        class="task-detail flex flex-col py-1rem bg-gray-50"
    >
        <div class="flex flex-col bg-white p-1rem">
            <input
                :value="task.name"
                class="mb-1rem text-2xl"
            />

            <div class="flex flex-col">
                <StepItem
                    v-for="step in steps"
                    :key="step.id"
                    :step="step"
                />
            </div>

            <TaskDetailAddStep
                class="mt-1rem"
            />
        </div>


        <input
            type="textarea"
            class="rounded box-shadow-none mt-2rem p-1rem"
            :autosize="{ minRows: 4 }"
            placeholder="Task Description"
        />
    </aside>
</template>