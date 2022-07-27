<script setup lang="ts">
import { Icon } from "@iconify/vue";
import useFinishIcon from '@/composables/useFinishIcon';
import type Step from '@/core/model/Step';
import type Task from '@/core/model/Task';

const props = defineProps<{
    plan: Task | Step
}>();

defineEmits(["toggleActive", "toggleFinish"]);

const finishIcon = useFinishIcon( props.plan );

</script>

<template>
    <div
        tabindex="0"
        data-context-trigger
        border-none p-1rem rounded text-lg flex items-center
        bg-white
        :class="[
            {
                'text-gray-500 line-through': plan.finished,
            }
        ]"
        @click="$emit('toggleActive')"
        @keydown.enter="$emit('toggleActive')"
        ref="el"
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