<style scoped>
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

.task-list::-webkit-scrollbar-track {
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.1);
}

.task-input {
    background: rgba(0, 0, 0, 0.2);
    color: #FFF;
}

.task-list.nothing-found {
    align-items: center;
    justify-content: center;
}

.completed-toggle {
    background: rgba(0, 0, 0, 0.5);
    padding: .5rem 1rem;
    border-radius: 5px;
}

.icon-svg.showCompleted {
    transform: rotate(180deg);
}

.active:deep(.task-item-inner) {
    background: #F3F3F3;
}
</style>

<template>
    <div class="inner h-full flex flex-col gap-8" v-if="list">
        <header class="list-header">
            <h2 class="text-4xl font-bold text-white">
                <GhostInput
                    :value="list.name"
                    @change="updateListName"
                />
            </h2>
        </header>

        <div
            :class="['task-list flex flex-col gap-2 task-list flex-1', list.tasks.length === 0 ? 'nothing-found' : '' ]"
        >
            <div
                class="text-white text-3xl flex items-center content-center flex-col"
                v-if="list.tasks.length === 0"
            >
                <img
                    src="@/assets/cute.svg"
                    alt="cute"
                    width="100"
                >
                <h2 class="mt-4">Let's add some task</h2>
            </div>

            <template v-else>
                <TaskItem
                    v-for="task in normalTasks"
                    :key="task.id"
                    :task="task"
                    @click="toggleTaskDetail(task)"
                    :class="task.id === todo.task?.id ? 'active' : ''"
                    :list-settings="list.settings"
                />

                <div
                    class="flex"
                    v-if="completedTasks.length"
                >
                    <button
                        class="completed-toggle text-white flex items-center"
                        @click="showCompleted = ! showCompleted"
                    >
                        <span>Completed</span>

                        <Icon
                            icon="ic:baseline-keyboard-arrow-down"
                            :class="['icon-svg ml-2', showCompleted ? 'showCompleted' : '' ]"
                        />
                    </button>
                </div>

                <template v-if="showCompleted">
                    <TaskItem
                        v-for="task in completedTasks"
                        :key="task.id"
                        :task="task"
                        @click="toggleTaskDetail(task)"
                        :list-settings="list.settings"
                    />
                </template>
            </template>
        </div>

        <AddNewInput
            placeholder="Add a task"
            @submit="addNewTask"
            maxlength="50"
        />
    </div>
</template>

<script setup lang="ts">
import List from "@/core/model/List";
import { Icon } from "@iconify/vue";
import TaskItem from "./TaskItem.vue";
import AddNewInput from "@/components/AddNewInput.vue";
import GhostInput from "@/components/GhostInput.vue";
import {ref, computed, watch} from "vue";
import type Task from "@/core/model/Task";
import accessor from "@/core/accessor/AccessorInstance";
import {useTodoStore} from "@/stores/todo";

const todo = useTodoStore();
const showCompleted = ref(false);

const props = defineProps({
    list: {
        type: List,
        required: true,
    }
});

const normalTasks = computed(() => {
    return props.list.tasks
        .filter(task => ! task.finish)
        .sort((task, task1) => task.sort - task1.sort);
});

const completedTasks = computed(() => {
    return props.list.tasks.filter(task => task.finish);
});

watch( () => props.list, () => {
    showCompleted.value = normalTasks.value.length === 0;
}, { immediate: true });

function addNewTask(name: string) {
    accessor.addTask(name, props.list.id).then(task => {
        todo?.list?.tasks.push(task);
    });
}

function toggleTaskDetail(task: Task) {
    todo.toggleTask(task);
}

interface iEvent {
    target: HTMLInputElement
}

function updateListName(e: iEvent) {
    const target = e.target;
    const name = target.value;

    accessor.updateTaskListProp(props.list.id, "name", name).then( r => {
        props.list.name = name;
    });
}
</script>