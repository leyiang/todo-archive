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
    <div class="task-list-wrap p-5 flex flex-col gap-8" v-if="activeList.focusing">
        <header class="list-header">
            <h2 class="text-4xl font-bold text-white">
                <GhostInput
                    :value="activeList.focusing.name"
                />
            </h2>
        </header>

        <div class="task-list flex flex-col gap-2 task-list flex-1">
            <TaskItem
                v-for="task in activeList.focusing.tasks"
                :task="task"
            />
        </div>

        <AddNewInput
            placeholder="Add a task"
            @submit="addNewTask"
        />
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
import { useListStore } from "@/stores/list";

const tasks : Ref<Task[]> = ref([]);
const activeList = useListStore();

provide("icon-column-width", 50);

accessor.getTasks().then( loaded => {
    tasks.value = loaded;
});

function addNewTask( name : string ) {
    if( activeList.focusing ) {
        accessor.addTask( name, activeList.focusing.id );
    }
}
</script>