<script setup lang="ts">
import {adapter, useTodoStore} from "@/stores/TodoStore";
import GhostInput from "@/components/common/GhostInput.vue";
import TaskListAddNew from "./TaskListAddNew.vue";
import {computed, ref} from "vue";
import type Folder from "@/core/model/folder/Folder";
import PlanList from "./PlanList.vue";
import FinishedPlanToggleButton from "./FinishedPlanToggleButton.vue"

const props = defineProps<{
    folder: Folder
}>();

const todoStore = useTodoStore();

const plans = computed(() => {
    const plans = props.folder.plans.slice();
    // TODO: Sort plans based on priority
    return plans.filter(plan => ! plan.finished);
});

const finishedPlans = computed(() => {
    const plans = props.folder.plans.slice();
    return plans.filter(plan => plan.finished);
});

const showFinished = ref<boolean>( false );


function renameFolder( e: any ) {
    const value = e.target.value;

    adapter.setFolderProp( props.folder.id, "name", value).then(() => {
        props.folder.name = value;
    });
}
</script>

<template>
    <div class="flex-1 flex flex-col overflow-hidden">
        <GhostInput
            data-test="folder-rename-input"
            :value="folder.name"
            class="mb-1.5rem font-bold text-2xl text-white"
            @change="renameFolder"
        />

        <div class="flex flex-col gap-5px overflow-auto flex-1" style="min-height: min-content">

            <div
                v-if="plans.length === 0"
                class="h-full flex flex-col items-center justify-center"
            >
                <span class="text-8xl mb-2rem">😃</span>
                <h2 class="font-bold text-white text-4xl text-shadow-md">Let's add a task :)</h2>
            </div>

            <PlanList
                :plans="plans"
            />

            <FinishedPlanToggleButton
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
