<script setup lang="ts">
import { computed } from "vue";
import {adapter, useTodoStore} from "@/stores/TodoStore";
import {onMounted, ref} from "vue";
import {addNewMenu} from "@/components/common/context-menu/ContextMenuData";
import Step from "@/core/model/Step";
import { getTodayString, getTomorrowString, splice } from "@/shared/utils";
import Folder from "@/core/model/folder/Folder";
import PlanItem from "./PlanItem.vue";

const todoStore = useTodoStore();
const props = defineProps({
    step: {
        type: Step,
        required: true
    }
});

const task = todoStore.taskMap[ props.step.task_id ];

function toggleTaskActive() {
    if( task === undefined ) return;
    todoStore.toggleTaskActive( task );
}

function toggleStepFinishStatus() {
    const finished = props.step.finished;

    adapter.setStepProp(props.step.id, "finished", ! finished).then(() => {
        console.warn("TODO, fix correct way of mutating props");
        props.step.finished = !finished;
    });
}

const planItem = ref<InstanceType<typeof PlanItem>>();

onMounted(() => {
    const el = planItem?.value?.$el;

    if( el instanceof HTMLElement ) {
        props.step.registerMenu( el );
    }
});
</script>

<template>
    <PlanItem
        data-test="step-item-in-task-list"

        ref="planItem"
        :plan="step"
        @toggle-active="toggleTaskActive"
        @toggle-finish="toggleStepFinishStatus"
    >
        {{ task?.name }} => {{ step.name }}
    </PlanItem>
</template>