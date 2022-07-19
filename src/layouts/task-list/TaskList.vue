<script setup lang="ts">
import {adapter, useTodoStore} from "@/stores/TodoStore";
import GhostInput from "@/components/common/GhostInput.vue";
import TaskListAddNew from "./TaskListAddNew.vue";
import {computed, ref} from "vue";
import type Folder from "@/core/model/folder/Folder";
import PlanList from "./PlanList.vue";
import FinishedPlanToggleButton from "@/layouts/FinishedPlanToggleButton.vue"

const props = defineProps<{
    folder: Folder
}>();

const allPlans = computed(() => {
    const plans = props.folder.plans.slice();

    return plans.sort( (plan, plan1) => {
        return plan1.priority - plan.priority;
    });
});

const plans = computed(() => {
    return allPlans.value.filter(plan => ! plan.finished);
});

const finishedPlans = computed(() => {
    return allPlans.value.filter(plan => plan.finished);
});

const showFinished = ref<boolean>( plans.value.length === 0 );

function renameFolder( e: any ) {
    const value = e.target.value;

    adapter.setFolderProp( props.folder.id, "name", value).then(() => {
        props.folder.name = value;
    });
}
</script>

<template>
    <div
        class="flex-1 flex flex-col overflow-hidden"
    >
        <GhostInput
            data-test="folder-rename-input"
            :value="folder.name"
            class="mb-1.5rem font-bold text-2xl text-white"
            @change="renameFolder"
        />

        <div class="flex flex-col gap-5px overflow-auto flex-1 custom-scrollbar" style="min-height: min-content">

            <div
                data-test="empty-task-list-placeholder"
                v-if="plans.length === 0 && finishedPlans.length === 0"
                class="h-full flex flex-col items-center justify-center"
            >
                <span class="text-8xl mb-2rem">😃</span>
                <h2 class="font-bold text-white text-4xl text-shadow-md">Let's add a task :)</h2>
            </div>

            <PlanList
                :plans="plans"
            />

            <div
                data-test="gap-between-expand-btn"
                v-if="plans.length !== 0"
                mb-10px
            />

            <FinishedPlanToggleButton
                data-test="finished-plan-toggle-btn"
                v-if="finishedPlans.length !== 0"
                :show="showFinished"
                @click="showFinished = ! showFinished"
            />

            <PlanList
                v-if="showFinished"
                :plans="finishedPlans"
            />
        </div>

    </div>

    <TaskListAddNew />
</template>
