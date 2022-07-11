<script setup lang="ts">
import Task from "@/core/model/Task";
import { Icon } from "@iconify/vue";
import {adapter, useTodoStore} from "@/stores/TodoStore";
import {computed} from "vue";
import useFinishIcon from "@/composables/useFinishIcon";

const todoStore = useTodoStore();
const props = defineProps({
    task: {
        type: Task,
        required: true
    }
});

const finishIcon = useFinishIcon( props.task );

function setActive() {
    todoStore.setActiveTask( props.task );
}

function toggleTaskFinishStatus() {
    const finished = props.task.finished;

    adapter.setTaskProp(props.task.id, "finished", ! finished).then(() => {
        console.warn("TODO, fix correct way of mutating props");
        props.task.finished = !finished;
    });
}
</script>

<template>
    <div
        class="task-item bg-white border-none p-1rem rounded text-lg flex items-center"
        :class="{ 'text-gray-500 line-through': task.finished }"
        @click="setActive"
    >
        <button
            class="flex items-center justify-center mr-1rem text-2xl"
            @click="toggleTaskFinishStatus"
        >
           <Icon :icon="finishIcon" />
        </button>

        <span>{{ task.name }}</span>
    </div>
</template>