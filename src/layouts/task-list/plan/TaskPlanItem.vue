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

function toggleTaskActive() {
    todoStore.toggleTaskActive( props.task );
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
                name: "Set as Today",
                action: () => {
                    adapter.setTaskProp( props.task.id, "date", "2022-07-05").then( affecting => {
                        affecting
                            .map( id => todoStore.folders.find(folder => folder.id === id) )
                            .forEach( folder => {
                                if( folder !== undefined ) {
                                    folder.plans.push( props.task );
                                }
                            });
                    });
                }
            },

            {
                name: "Remove Task",
                action: () => {
                    adapter.removeTask( props.task.id ).then(() => {
                        todoStore.removeTask( props.task );
                    });
                }
            },
        ]);
    }
});
</script>

<template>
    <div
        tabindex="0"
        data-test="task-item"
        data-context-trigger
        class="task-item"
        bg-white border-none p-1rem rounded text-lg flex items-center
        :class="{ 'text-gray-500 line-through': task.finished }"
        @click="toggleTaskActive"
        @keydown.enter="toggleTaskActive"
        ref="el"
    >
        <button
            data-test="task-finish-button"
            flex items-center justify-center mr-1rem text-2xl
            btn-reset
            @click.stop="toggleTaskFinishStatus"
        >
           <Icon :icon="finishIcon" />
        </button>

        <span>{{ task.name }}</span>
    </div>
</template>