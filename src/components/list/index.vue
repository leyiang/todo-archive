<style scoped>
.task-list-wrap {
    background-color: #73d197;
}
.task-list {
    overflow-y: scroll;
    padding-right: 5px;
}

.task-list::-webkit-scrollbar {
    width: 8px;
    margin-left: 1rem;
}

.task-list::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.3);
}

.task-input {
    background: rgba(0, 0, 0, 0.2);
    color: #FFF;
}
</style>

<template>
    <div class="task-list-wrap p-5">
        <div class="inner h-full flex flex-col gap-8" v-if="todo.list">
            <header class="list-header">
                <h2 class="text-4xl font-bold text-white">
                    <GhostInput
                        :value="todo.list.name"
                    />
                </h2>
            </header>

            <div class="task-list flex flex-col gap-2 task-list flex-1">
                <TaskItem
                    v-for="task in todo.list.tasks"
                    :key="task.id"
                    :task="task"
                    @toggleStatus="toggleTaskStatus"
                    @click="focusTask(task)"
                />
            </div>

            <AddNewInput
                placeholder="Add a task"
                @submit="addNewTask"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import TaskItem from "./TaskItem.vue";
import AddNewInput from "@/components/AddNewInput.vue";
import GhostInput from "@/components/GhostInput.vue";
import { provide, ref } from "vue";
import type { Ref } from "vue";
import type Task from "@/core/model/Task";
import accessor from "@/core/accessor/AccessorInstance";
import { useTodoStore } from "@/stores/todo";

const todo = useTodoStore();

provide("icon-column-width", 50);

function addNewTask( name : string ) {
    if( todo.list !== null ) {
        accessor.addTask( name, todo.list.id ).then( task => {
            todo?.list?.tasks.push( task );
        });
    }
}

function toggleTaskStatus( task: Task ) {
    const type = ! task.finish;

    accessor.setTaskFinishStatus( task.id, type ).then( r => {
        /**
         * Update Array element from Pinia is not reactive
         * Not sure what happens, temporarily use this hack
         */
        task.finish = ! type;
        task.finish = type;

        todo.setTaskStatus( task.id, type );
    });
}


function focusTask( task : Task ) {
    todo.setTask( task );
}
</script>