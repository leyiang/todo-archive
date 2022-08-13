<script setup lang="ts">
import Task from "@/core/model/Task";
import {adapter, useTodoStore} from "@/stores/TodoStore";
import {onMounted, ref, computed} from "vue";
import PlanItem from "./PlanItem.vue";
import TaskLabel from "./TaskLabel.vue";

const todoStore = useTodoStore();
const props = defineProps({
    task: {
        type: Task,
        required: true
    }
});

function toggleTaskActive() {
    todoStore.toggleTaskActive( props.task );
}

function toggleTaskFinishStatus() {
    const finished = props.task.finished;

    adapter.setTaskProp(props.task.id, "finished", ! finished).then(() => {
        console.warn("TODO, fix correct way of mutating props");
        props.task.finished = !finished;
    });
}

const planItem = ref<InstanceType<typeof PlanItem>>();
onMounted(() => {
    const el = planItem?.value?.$el;

    if( el instanceof HTMLElement ) {
        props.task.registerMenu( el );
    }
});
</script>

<template>
    <PlanItem
        data-test="task-item"

        ref="planItem"
        :plan="task"
        @toggle-active="toggleTaskActive"
        @toggle-finish="toggleTaskFinishStatus"
    >
        <template #labels>
            <TaskLabel
                v-for="label in task.labels"
                :name="label"
            />
        </template>
    </PlanItem>
</template>