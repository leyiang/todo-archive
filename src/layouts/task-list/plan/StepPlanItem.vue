<script setup lang="ts">
import { computed } from "vue";
import {adapter, useTodoStore} from "@/stores/TodoStore";
import {onMounted, ref} from "vue";
import {addNewMenu} from "@/components/common/context-menu/ContextMenuData";
import Step from "@/core/model/Step";
import { getTodayString, getTomorrowString, splice } from "@/shared/utils";
import Folder from "@/core/model/folder/Folder";
import PlanItem from "./PlanItem.vue";

const todoStore = useTodoStore();
const props = defineProps({
    step: {
        type: Step,
        required: true
    }
});

const task = todoStore.taskMap[ props.step.task_id ];

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

const planItem = ref<InstanceType<typeof PlanItem>>();

onMounted(() => {
    const el = planItem?.value?.$el;

    if( el instanceof HTMLElement ) {
        addNewMenu( el, [
            {
                name: computed(() => props.step.date === getTodayString() ? "Today's Part is done" : "Set as Today"),
                action: () => {
                    if( props.step.date === getTodayString() ) {
                        adapter.setStepProp( props.step.id, "date", null).then( affecting => {
                            props.step.date = null;

                            affecting.forEach( id => {
                                const folder = todoStore.folderMap[id];

                                if( folder instanceof Folder ) {
                                    splice( folder.plans, props.step );
                                }
                            });
                        });
                    } else {
                        adapter.setStepProp( props.step.id, "date", getTodayString()).then( affecting => {
                            props.step.date = getTodayString();

                            affecting.forEach( id => {
                                const folder = todoStore.folderMap[ id ];

                                if( folder instanceof Folder ) {
                                    folder.plans.push(props.step);
                                }
                            });
                        });
                    }
                }
            },

            {
                name: computed(() => props.step.date === getTomorrowString() ? "Remove from tomorrow" : "Set as Tomorrow"),
                action: () => {
                    adapter.setStepProp( props.step.id, "date", getTomorrowString()).then( () => {
                        props.step.date = getTomorrowString();
                    });
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
    <PlanItem
        data-test="step-item-in-task-list"

        ref="planItem"
        :plan="step"
        @toggle-active="toggleTaskActive"
        @toggle-finish="toggleStepFinishStatus"
    >
        {{ task?.name }} => {{ step.name }}
    </PlanItem>
</template>