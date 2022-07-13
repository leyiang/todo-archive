<script setup lang="ts">
import Task from "@/core/model/Task";
import { Icon } from "@iconify/vue";
import {adapter, useTodoStore} from "@/stores/TodoStore";
import useFinishIcon from "@/composables/useFinishIcon";
import {onMounted, type Ref, ref} from "vue";
import {addNewMenu} from "@/components/common/context-menu/ContextMenuData";

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

const el: Ref<HTMLElement | null> = ref(null);
onMounted(() => {
    if( el.value !== null ) {
        addNewMenu( el.value, [
            {
                name: "Remove Task",
                action: () => {
                    adapter.removeTask( props.task.id ).then(() => {
                        todoStore.removeTask( props.task );
                    });
                }
            }
        ]);
    }
});
</script>

<template>
    <div
        data-test="task-item"
        data-context-trigger
        class="task-item bg-white border-none p-1rem rounded text-lg flex items-center"
        :class="{ 'text-gray-500 line-through': task.finished }"
        @click.self="setActive"
        ref="el"
    >
        <button
            data-test="task-finish-button"
            class="flex items-center justify-center mr-1rem text-2xl"
            @click.stop="toggleTaskFinishStatus"
        >
           <Icon :icon="finishIcon" />
        </button>

        <span>{{ task.name }}</span>
    </div>
</template>