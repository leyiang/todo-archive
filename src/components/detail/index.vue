<style>
.task-detail {
    max-width: 340px;
    background-color: #F9F9F9;
}

</style>

<template>
    <div
        class="task-detail"
        v-if="todo.task"
    >
        <div class="bg-white p-3">
            <div class="">
                <StepWrap
                    class="flex items-center"
                    :finish="todo.task.finish"
                >
                    <IconColumn>
                        <FinishButton
                            class="text-2xl"
                            :finish="todo.task.finish"
                            @click="toggleStatus"
                        />
                    </IconColumn>

                    <h1 class="text-xl">
                        <GhostInput
                            :value="todo.task.name"
                        />
                    </h1>

                </StepWrap>
            </div>


            <div class="flex flex-col mt-5">
                <StepItem
                    v-for="step in todo.task.steps"
                    :step="step"
                    @toggleStatus="toggleStepStatus( step )"
                />
            </div>

            <div class="mt-1">
                <AddNewInput
                    placeholder="Add a task"
                    @submit="addNewStep"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import FinishButton from "@/components/FinishButton.vue"
import AddNewInput from "@/components/AddNewInput.vue"
import IconColumn from "@/components/IconColumn.vue";
import GhostInput from "@/components/GhostInput.vue";
import StepWrap from "@/components/StepWrap.vue";
import StepItem from "./StepItem.vue";
import { useTodoStore } from "@/stores/todo";
import accessor from "@/core/accessor/AccessorInstance";

const todo = useTodoStore();

function toggleStatus() {
    if( todo.task ) {
        const type = ! todo.task.finish;

        accessor.setTaskFinishStatus( todo.task.id, type ).then( r => {
            /**
             * Missing Reactive
             * Use this hack to let it work
             * @type {boolean}
             */
            todo.task.finish = ! type;
            todo.task.finish = type;

            todo.setTaskStatus(todo.task.id, type );
        });
    }
}

function addNewStep( name ) {
    if( todo.task ) {
        accessor.addStep( name, todo.task.id ).then( step => {
            todo.task.steps.push( step );
        });
    }
}

function toggleStepStatus( step ) {
    const status = ! step.finish;
    accessor.setStepStatus( step.id, status).then( r => {
        /**
         * Hack for responsive to work
         * Update: No need for this hack, go list/index.vue
         * to check the detailed reason
         * @type {boolean}
         */
        // step.finish = ! status;
        step.finish = status;
    });
}
</script>