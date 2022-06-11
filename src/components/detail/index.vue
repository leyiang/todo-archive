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
                    v-for="i in 5"
                />
            </div>

            <div class="mt-1">
                <AddNewInput
                    placeholder="Add a task"
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
</script>