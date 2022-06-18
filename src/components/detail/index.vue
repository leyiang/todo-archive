<style>
.task-detail {
    max-width: 440px;
    background-color: #F3F3F3;
}
</style>

<template>
    <div
        class="task-detail flex gap-4 flex-col p-3"
    >
        <div class="bg-white p-3">
            <div class="">
                <StepWrap
                    class="flex items-start"
                    :finish="task.finish"
                >
                    <IconColumn
                        class="mt-2"
                    >
                        <FinishButton
                            class="text-2xl"
                            :finish="task.finish"
                            @click="toggleStatus"
                        />
                    </IconColumn>

                    <h1 class="text-xl flex-1">
                        <ResizableTextarea
                            class="p-2 w-full"
                            v-text="task.name"
                            @change="updateTaskName"
                        />
                    </h1>
                </StepWrap>
            </div>


            <div class="flex flex-col mt-5">
                <StepItem
                    v-for="step in task.steps"
                    :step="step"
                    @toggleStatus="toggleStepStatus( step )"
                />
            </div>

            <div class="mt-1">
                <AddNewInput
                    placeholder="Add a task"
                    @submit="addNewStep"
                    maxlength="50"
                />
            </div>
        </div>

        <div class="bg-white flex-1">
            <textarea
                placeholder="Add notes"
                class="w-full h-full p-3"
                @change="updateNotes"
                v-model="task.notes"
            >{{ task.notes }}</textarea>
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
import { defineProps } from "vue";
import Task from "@/core/model/Task";
import ResizableTextarea from "@/components/ResizableTextarea.vue";

const todo = useTodoStore();
const props = defineProps({
    task: {
        type: Task,
        required: true
    }
})

function toggleStatus() {
    if( props.task ) {
        const type = ! props.task.finish;

        accessor.setTaskFinishStatus( props.task.id, type ).then( r => {
            /**
             * Missing Reactive
             * Use this hack to let it work
             * @type {boolean}
             */
            props.task.finish = ! type;
            props.task.finish = type;

            todo.setTaskStatus(props.task.id, type );
        });
    }
}

function addNewStep( name ) {
    if( props.task ) {
        accessor.addStep( name, props.task.id ).then( step => {
            props.task.steps.push( step );
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
        step.finish = ! status;
        step.finish = status;
    });
}

function updateNotes() {
    accessor.updateTaskProp( props.task.id, "notes", props.task.notes).then( r => {

    });
}

function updateTaskName(e) {
    const name = e.target.value;
    accessor.updateTaskProp(props.task.id, "name", name).then( r => {
        props.task.name = '';
        props.task.name = name;
    });
}
</script>