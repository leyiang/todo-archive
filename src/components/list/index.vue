<style scoped>
.task-list-wrap {
    background-color: #73d197;
}

.task-list {
    overflow-y: auto;
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

.task-list.nothing-found {
    align-items: center;
    justify-content: center;
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

            <div
                :class="['task-list flex flex-col gap-2 task-list flex-1', todo.list.tasks.length === 0 ? 'nothing-found' : '' ]"
            >
                <div
                    class="text-white text-3xl flex items-center content-center flex-col"
                    v-if="todo.list.tasks.length === 0"
                >
                    <img
                        src="@/assets/cute.svg"
                        alt="cute"
                        width="100"
                    >
                    <h2 class="mt-4">Nothing Found</h2>
                </div>

                <TaskItem
                    v-for="task in todo.list.tasks"
                    :key="task.id"
                    :task="task"
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
import {provide, ref} from "vue";
import type Task from "@/core/model/Task";
import accessor from "@/core/accessor/AccessorInstance";
import {useTodoStore} from "@/stores/todo";
import {registerMenu} from "@/components/context_menu/data";

const todo = useTodoStore();

provide("icon-column-width", 50);

function addNewTask(name: string) {
    if (todo.list !== null) {
        accessor.addTask(name, todo.list.id).then(task => {
            todo?.list?.tasks.push(task);
        });
    }
}

function focusTask(task: Task) {
    todo.toggleTask(task);
}
</script>