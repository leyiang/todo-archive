<script setup lang="ts">
import {useTodoStore} from "@/stores/TodoStore";
import GhostInput from "@/components/common/GhostInput.vue";
import TaskListAddNew from "./TaskListAddNew.vue";
import TaskItem from "./TaskItem.vue";
import { computed } from "vue";
import Task from "@/core/model/Task";
import type Step from "@/core/model/Step";

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
    <main class="task-list flex flex-col px-1rem py-2rem gap-1rem">
        <div class="flex-1">
            <template v-if="todoStore.activeFolder">
                <GhostInput
                    :value="todoStore?.activeFolder?.name"
                    class="mb-1.5rem font-bold text-2xl text-white"
                />

                <div class="flex flex-col gap-5px">
                    <template v-for="plan in plans">
                        <TaskItem
                            v-if="isTask( plan )"
                            :key="plan.id"
                            :task="plan"
                        />

                        <span v-else>{{ plan.name }}</span>
                    </template>
                </div>

            </template>
        </div>

        <TaskListAddNew />
    </main>
</template>