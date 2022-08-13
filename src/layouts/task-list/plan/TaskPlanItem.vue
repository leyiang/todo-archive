<script setup lang="ts">
import Task from "@/core/model/Task";
import {adapter, useTodoStore} from "@/stores/TodoStore";
import {onMounted, ref, computed} from "vue";
import {addNewMenu} from "@/components/common/context-menu/ContextMenuData";
import { getTodayString, getTomorrowString, splice } from "@/shared/utils";
import Folder from "@/core/model/folder/Folder";
import PlanItem from "./PlanItem.vue";
import TaskLabel from "./TaskLabel.vue";

const todoStore = useTodoStore();
const props = defineProps({
    task: {
        type: Task,
        required: true
    }
});

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

const planItem = ref<InstanceType<typeof PlanItem>>();
onMounted(() => {
    const el = planItem?.value?.$el;

    if( el instanceof HTMLElement ) {
        addNewMenu( el, [
            {
                name: computed(() => props.task.date === getTodayString() ? "Today's Part is done" : "Set as Today"),
                action: () => {
                    if( props.task.date === getTodayString() ) {
                        adapter.setTaskProp( props.task.id, "date", null).then( affecting => {
                            props.task.date = null;

                            affecting.forEach( id => {
                                const folder = todoStore.folderMap[id];

                                if( folder instanceof Folder ) {
                                    splice( folder.plans, props.task );
                                }
                            });
                        });
                    } else {
                        adapter.setTaskProp( props.task.id, "date", getTodayString()).then( affecting => {
                            props.task.date = getTodayString();

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
                name: computed(() => props.task.date === getTomorrowString() ? "Remove from tomorrow" : "Set as Tomorrow"),
                action: () => {
                    adapter.setTaskProp( props.task.id, "date", getTomorrowString()).then( affecting => {
                        props.task.date = getTomorrowString();
                    });
                }
            },
            {
                name: "Move task to",

                children: todoStore.folders.map( folder => ({
                    name: folder.name,
                    action: () => {
                        adapter.setTaskProp( props.task.id, "folder_id", folder.id ).then( r => {
                            const oldFolder = todoStore.folderMap[ props.task.folder_id ];
                            splice( oldFolder.plans, props.task );

                            props.task.folder_id = folder.id;
                            folder.plans.push( props.task );
                        });
                    }
                }))
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
    <PlanItem
        data-test="task-item"

        ref="planItem"
        :plan="task"
        @toggle-active="toggleTaskActive"
        @toggle-finish="toggleTaskFinishStatus"
    >
        <template #labels>
            <TaskLabel
                v-for="label in task.labels"
                :name="label"
            />
        </template>
    </PlanItem>
</template>