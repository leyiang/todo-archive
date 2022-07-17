<script setup lang="ts">
import {computed} from "vue";
import TaskDetailAddStep from "./TaskDetailAddStep.vue";
import Task from "@/core/model/Task";
import StepItem from "./StepItem.vue";
import ResizableTextarea from "@/components/common/ResizableTextarea.vue";

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
        class="task-detail flex flex-col bg-gray-50"
        p-1rem
    >
        <div class="flex flex-col flex-1" overflow-hidden>
            <input
                data-test="task-name-input"
                :value="task.name"
                mb-1rem text-xl px-10px
                border="none"
                bg-transparent
            />

            <div class="flex flex-col flex-1 custom-scrollbar" overflow-auto>
                <StepItem
                    v-for="step in steps"
                    :key="step.id"
                    :step="step"
                />
            </div>

            <TaskDetailAddStep />
        </div>
        
        <div class="divider" my-2rem h-1px bg-gray-200></div>

        <div
            data-test="task-detail-additional"
            flex="~ 1 col"
        >
            <ResizableTextarea
                class="rounded box-shadow-none p-1rem"
                border="1 gray-300"
                placeholder="Task Description"
            />
        </div>
    </aside>
</template>