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
        <template v-if="todoStore.activeFolder">
            <div class="flex-1 flex flex-col">
                <GhostInput
                    :value="todoStore?.activeFolder?.name"
                    class="mb-1.5rem font-bold text-2xl text-white"
                />

                <div class="flex flex-col gap-5px flex-1">

                    <div
                        v-if="plans.length === 0"
                        class="h-full flex flex-col items-center justify-center"
                    >
                        <span class="text-8xl mb-2rem">😃</span>
                        <h2 class="font-bold text-white text-4xl text-shadow-md">Let's add a task :)</h2>
                    </div>

                    <template v-for="plan in plans">
                        <TaskItem
                            v-if="isTask( plan )"
                            :key="plan.id"
                            :task="plan"
                        />

                        <span v-else>{{ plan.name }}</span>
                    </template>
                </div>

            </div>

            <TaskListAddNew />
        </template>

        <template v-else>
            <div class="flex items-center justify-center h-full flex-col">
                <span class="text-8xl mb-2rem">😃</span>
                <h2 class="font-bold text-white text-4xl text-shadow-md">Let's select a folder :)</h2>
            </div>
        </template>
    </main>
</template>