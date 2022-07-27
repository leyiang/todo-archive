<script setup lang="ts">
import { Icon } from "@iconify/vue";
import useFinishIcon from '@/composables/useFinishIcon';
import type Step from '@/core/model/Step';
import Task from '@/core/model/Task';
import { useTodoStore } from "@/stores/TodoStore";
import { computed } from "vue";

const props = defineProps<{
    plan: Task | Step
}>();

defineEmits(["toggleActive", "toggleFinish"]);

const finishIcon = useFinishIcon( props.plan );
const todoStore = useTodoStore();

const dynamicClass = computed(() => {
    const currentTask = props.plan instanceof Task
        ? props.plan
        : todoStore.taskMap[ props.plan.task_id ];

    return [
        currentTask === todoStore.activeTask ? 'bg-emerald-100' : 'bg-white',

        {
            'text-gray-500 line-through': props.plan.finished,
        }
    ]
});
</script>

<template>
    <div
        tabindex="0"
        data-context-trigger

        border-none p-1rem rounded text-lg flex items-center
        :class="dynamicClass"

        ref="el"
        @click="$emit('toggleActive')"
        @keydown.enter="$emit('toggleActive')"
    >
        <button
            data-test="task-finish-button"
            flex items-center justify-center mr-1rem text-2xl
            btn-reset
            @click.stop="$emit('toggleFinish')"
        >
           <Icon :icon="finishIcon" />
        </button>

        <span class="select-none">
            <slot>{{ plan.name }}</slot>
        </span>
    </div>
</template>