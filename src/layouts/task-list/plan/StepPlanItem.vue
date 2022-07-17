<script setup lang="ts">
import { Icon } from "@iconify/vue";
import {adapter, useTodoStore} from "@/stores/TodoStore";
import useFinishIcon from "@/composables/useFinishIcon";
import {onMounted, type Ref, ref} from "vue";
import {addNewMenu} from "@/components/common/context-menu/ContextMenuData";
import Step from "@/core/model/Step";

const todoStore = useTodoStore();
const props = defineProps({
    step: {
        type: Step,
        required: true
    }
});

const task = todoStore.taskMap[ props.step.task_id ];
const finishIcon = useFinishIcon( props.step );

function toggleTaskActive() {
    if( task === undefined ) return;
    todoStore.toggleTaskActive( task );
}

function toggleStepFinishStatus() {
    const finished = props.step.finished;

    adapter.setStepProp(props.step.id, "finished", ! finished).then(() => {
        console.warn("TODO, fix correct way of mutating props");
        props.step.finished = !finished;
    });
}

const el: Ref<HTMLElement | null> = ref(null);

onMounted(() => {
    if( el.value !== null ) {
        addNewMenu( el.value, [
            {
                name: "Set as Today",
                action: () => {
                    // adapter.setTaskProp( props.step.id, "date", getTodayString()).then( affecting => {
                    //     affecting
                    //         .map( id => todoStore.folders.find(folder => folder.id === id) )
                    //         .forEach( folder => {
                    //             if( folder !== undefined ) {
                    //                 folder.plans.push( props.step );
                    //             }
                    //         });
                    // });
                }
            },

            {
                name: "Remove Step",
                action: () => {
                    adapter.removeStep( props.step.id ).then(() => {
                        todoStore.removeStep( props.step );
                    });
                }
            },
        ]);
    }
});
</script>

<template>
    <div
        data-test="step-item-in-task-list"
        data-context-trigger
        class="task-item bg-white border-none p-1rem rounded text-lg flex items-center"
        :class="{ 'text-gray-500 line-through': step.finished }"
        @click="toggleTaskActive"
        @keydown.enter="toggleTaskActive"
        ref="el"
    >
        <button
            data-test="task-finish-button"
            flex items-center justify-center mr-1rem text-2xl
            btn-reset
            @click.stop="toggleStepFinishStatus"
        >
            <Icon :icon="finishIcon" />
        </button>

        <span>{{ task?.name }} => {{ step.name }}</span>
    </div>
</template>