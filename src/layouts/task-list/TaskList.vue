<script setup lang="ts">
import {useTodoStore} from "@/stores/TodoStore";
import TaskListAddNew from "./TaskListAddNew.vue";
import TaskItem from "./TaskItem.vue";
import { computed } from "vue";
import Task from "@/core/model/Task";
import Step from "@/core/model/Step";

const todoStore = useTodoStore();
const plans = computed(() => {
    if( todoStore.activeFolder ) {
        const plans = todoStore.activeFolder.plans.slice();
        // TODO: Sort plans based on priority
        return plans;
    } else {
        return [];
    }
});

function isTask( plan: Task | Step ) : plan is Task {
    return plan instanceof Task;
}
</script>

<template>
    <main>
        <div v-if="todoStore.activeFolder">
            <template v-for="plan in plans">
                <TaskItem
                    v-if="isTask( plan )"
                    :key="plan.id"
                    :task="plan"
                />
            </template>

            <TaskListAddNew />
        </div>
    </main>
</template>