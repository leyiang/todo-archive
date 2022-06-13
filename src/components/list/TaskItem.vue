<template>
    <button
        class="cursor-auto"
        ref="el"
    >
        <StepWrap
            class="task-item flex bg-white rounded text-lg py-5"
            :finish="task.finish"
            tabindex="0"
        >
            <IconColumn>
                <FinishButton
                    class="text-2xl"
                    :finish="task.finish"
                    @click.stop="toggleTaskStatus"
                />
            </IconColumn>

            <span>{{ task.name }}</span>

            <IconColumn class="ml-auto">
                <button
                    class="text-2xl"
                    @click.stop="setTaskImportantStatus"
                >
                    <Icon
                        :icon="iconType"
                        style="color: goldenrod"
                    />
                </button>
            </IconColumn>
        </StepWrap>
    </button>
</template>

<script setup>
import FinishButton from "@/components/FinishButton.vue";
import { Icon } from "@iconify/vue";
import IconColumn from "@/components/IconColumn.vue";
import StepWrap from "@/components/StepWrap.vue";
import Task from "@/core/model/Task";
import {registerMenu} from "@/components/context_menu/data";
import {ref, onMounted, computed} from "vue";
import accessor from "@/core/accessor/AccessorInstance";
import {useTodoStore} from "@/stores/todo";
import {format} from "@/core/shared/utils";

const props = defineProps({
    task: {
        type: Task,
        require: true
    }
});

const el = ref(null);
const todo = useTodoStore();
const iconType = computed(() => {
    return props.task.important
        ? "ic:round-star"
        : "ic:round-star-border";
});

onMounted(() => {
    registerMenu(el.value, {
        items: [
            {
                name: "Remove Task",
                args: {
                    el: el.value,
                    task: props.task
                },

                action: (args) => {
                    accessor.removeTask( props.task.id ).then( list_id_list => {
                        todo.removeTask( props.task, list_id_list );
                    });
                }
            },
            {
                name: "Set as today",

                action: () => {
                    accessor.setTaskToday( props.task.id ).then( list_id_list => {
                        props.task.date = format("Y-m-d");
                        todo.updateSpecialLists( props.task, list_id_list );
                    });
                }
            }
        ]
    });
});

function toggleTaskStatus() {
    const task = props.task;
    const type = !task.finish;

    accessor.setTaskFinishStatus(task.id, type).then(r => {
        /**
         * Update Array element from Pinia is not reactive
         * Not sure what happens, temporarily use this hack
         *
         * Update:
         * No need for this hack anymore.
         * Guess In StoreAccessor it only affects the value,
         * not the reference, so it won't trigger reactive changes
         * And even though we Set the Property here,
         * The value is the same -> Accessor set task.finish to by type
         * So the solution here is we don't need to set finish in accessor
         * Just set finish here will solve our problem
         */
        task.finish = !type;
        task.finish = type;
    });
}

function setTaskImportantStatus() {
    const task = props.task;
    const status = ! task.important;
    accessor.setTaskImportantStatus(task.id, status).then(list_id_list => {
        task.important = ! status;
        task.important = status;

        todo.updateSpecialLists( task, list_id_list );
    });
}
</script>