<script setup lang="ts">
import Task from "@/core/model/Task";
import { Icon } from "@iconify/vue";
import {adapter, useTodoStore} from "@/stores/TodoStore";
import useFinishIcon from "@/composables/useFinishIcon";
import {onMounted, type Ref, ref, nextTick, computed} from "vue";
import {addNewMenu} from "@/components/common/context-menu/ContextMenuData";
import { getTodayString, splice } from "@/shared/utils";
import Folder from "@/core/model/folder/Folder";

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
                name: computed(() => props.task.date === getTodayString() ? "Today's Part is done" : "Set as Today"),
                action: () => {
                    if( props.task.date === getTodayString() ) {
                        adapter.setTaskProp( props.task.id, "date", null).then( affecting => {
                            affecting.forEach( id => {
                                const folder = todoStore.folderMap[id];

                                if( folder instanceof Folder ) {
                                    splice( folder.plans, props.task );
                                }
                            });
                        });
                    } else {
                        adapter.setTaskProp( props.task.id, "date", getTodayString()).then( affecting => {
                            affecting.forEach( id => {
                                const folder = todoStore.folderMap[ id ];

                                if( folder instanceof Folder ) {
                                    folder.plans.push(props.task);
                                }
                            });
                        });
                    }
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
        border-none p-1rem rounded text-lg flex items-center
        bg-white
        :class="[
            {
                'text-gray-500 line-through': task.finished,
            }
        ]"
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

        <span class="select-none">{{ task.name }}</span>
    </div>
</template>