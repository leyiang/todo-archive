<script setup lang="ts">
import {computed, ref} from "vue";
import TaskDetailAddStep from "./TaskDetailAddStep.vue";
import Task from "@/core/model/Task";
import StepItem from "./StepItem.vue";
import ResizableTextarea from "@/components/common/ResizableTextarea.vue";
import FinishedPlanToggleButton from "@/layouts/FinishedPlanToggleButton.vue"

const props = defineProps({
    task: {
        type: Task,
        required: true
    }
});

const steps = computed(() => {
    const steps = props.task.steps.slice();
    return steps.filter( step => ! step.finished );
});

const finishedSteps = computed(() => {
    const steps = props.task.steps.slice();
    return steps.filter( step => step.finished );
});

const show = ref(false);
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

                <div class="flex" v-if="finishedSteps.length">
                    <FinishedPlanToggleButton
                        data-test="finished-step-toggle-btn"
                        flex-1
                        bg-gray-400
                        @click="show = ! show"
                        :show="show"
                    />
                </div>

                <template v-if="show">
                    <StepItem
                        v-for="step in finishedSteps"
                        :key="step.id"
                        :step="step"
                    />
                </template>
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