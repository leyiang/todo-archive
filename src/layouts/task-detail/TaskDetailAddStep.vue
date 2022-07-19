<script setup lang="ts">
import {adapter, useTodoStore} from "@/stores/TodoStore";
import type {rawStep, rawTask} from "@/core/model/rawTypes";
import Task from "@/core/model/Task";
import Step from "@/core/model/Step";
import AddNewInput from "@/components/common/AddNewInput/AddNewInput.vue";

const todoStore = useTodoStore();

function addNewStep( value: string ) {
    if( todoStore.activeTask instanceof Task ) {
        adapter.addStep(value, todoStore.activeTask.id).then((raw: rawStep) => {
            const step = Step.Load( raw );
            todoStore.activeTask?.steps.push( step );
        });
    }
}
</script>

<template>
    <AddNewInput
        data-test="step-add-new"
        p-1rem rounded
        border="1 gray-300"
        type="text"
        @add="addNewStep"
        placeholder="Add New Step"
        :max-length="32"
    />
</template>