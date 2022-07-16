<script setup lang="ts">
import { Icon } from "@iconify/vue";
import {adapter, useTodoStore} from "@/stores/TodoStore";
import StepPlanItem from "./plan/StepPlanItem.vue";
import TaskPlanItem from "./plan/TaskPlanItem.vue";
import GhostInput from "@/components/common/GhostInput.vue";
import TaskListAddNew from "./TaskListAddNew.vue";
import {computed, ref} from "vue";
import Task from "@/core/model/Task";
import Step from "@/core/model/Step";
import type Folder from "@/core/model/folder/Folder";

const todoStore = useTodoStore();
const plans = computed(() => {
    if( todoStore.activeFolder ) {
        const plans = todoStore.activeFolder.plans.slice();
        // TODO: Sort plans based on priority
        return plans.filter(plan => ! plan.finished);
    } else {
        return [];
    }
});

const finishedPlans = computed(() => {
    if( todoStore.activeFolder ) {
        const plans = todoStore.activeFolder.plans.slice();
        return plans.filter(plan => plan.finished);
    } else {
        return [];
    }
});

const showFinished = ref<boolean>( false );

function isTask( plan: Task | Step ) : plan is Task {
    return plan instanceof Task;
}

function isStep( plan: Task | Step ) : plan is Step {
    return plan instanceof Step;
}

function renameFolder( e: any ) {
    const value = e.target.value;

    if( todoStore.activeFolder !== null ) {
        const folder = todoStore.activeFolder as Folder;

        adapter.setFolderProp( todoStore.activeFolder.id, "name", value).then(() => {
            folder.name = value;
        });
    }
}
</script>

<template>
    <main class="task-list flex flex-col px-1rem py-2rem gap-1rem">
        <template v-if="todoStore.activeFolder">
            <div class="flex-1 flex flex-col overflow-hidden">
                <GhostInput
                    data-test="folder-rename-input"
                    :value="todoStore?.activeFolder?.name"
                    class="mb-1.5rem font-bold text-2xl text-white"
                    @change="renameFolder"
                />

                <div class="flex flex-col gap-5px overflow-auto" style="min-height: min-content">

                    <div
                        v-if="plans.length === 0"
                        class="h-full flex flex-col items-center justify-center"
                    >
                        <span class="text-8xl mb-2rem">😃</span>
                        <h2 class="font-bold text-white text-4xl text-shadow-md">Let's add a task :)</h2>
                    </div>

                    <template v-for="plan in plans">
                        <TaskPlanItem
                            v-if="isTask( plan )"
                            :key="plan.id"
                            :task="plan"
                        />

                        <StepPlanItem
                            v-else-if="isStep( plan )"
                            :key="plan.id"
                            :step="plan"
                        />
                    </template>

                    <button
                        v-if="finishedPlans.length !== 0"
                        class="
                         bg-gray-700 text-white py-10px px-1rem rounded flex items-center
                         mr-auto mt-10px
                        "
                        @click="showFinished = ! showFinished"
                    >
                        <span class="mr-8px">Completed</span>

                        <Icon
                            class="text-xl"
                            :icon="showFinished ? 'ic:baseline-keyboard-arrow-up' : 'ic:baseline-keyboard-arrow-down'"
                        />
                    </button>

                    <template v-if="showFinished">
                        <template v-for="plan in finishedPlans">
                            <TaskPlanItem
                                v-if="isTask( plan )"
                                :key="plan.id"
                                :task="plan"
                            />

                            <StepPlanItem
                                v-else-if="isStep( plan )"
                                :key="plan.id"
                                :step="plan"
                            />
                        </template>
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