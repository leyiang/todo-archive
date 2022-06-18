<style>
.task-name {
    text-align: left;
}

.tag {
    background-color: pink;
    color: #FFF;
    border-radius: 5px;
    padding: 0px 10px;
    font-size: small;
}

.due-date {
    font-weight: 700;
}
</style>

<template>
    <button
        class="task-item cursor-auto"
        ref="el"
    >
        <StepWrap
            class="flex bg-white rounded text-lg py-4 task-item-inner"
            :finish="task.finish"
        >
            <div class="flex items-start">
                <IconColumn>
                    <FinishButton
                        class="text-2xl mt-0.5"
                        :finish="task.finish"
                        @click.stop="toggleTaskStatus"
                    />
                </IconColumn>

                <div class="flex flex-col content-start">
                    <span class="task-name">{{ task.name }}</span>

                    <div
                        class="additional-info flex gap-3"
                        v-if="! listSettings.hideAdditional"
                    >
                        <!-- Tags -->
                        <template v-if="! listSettings.hideTags">
                            <div
                                class="tags flex gap-1"
                                v-if="task.tags.length"
                            >
                            <span
                                class="tag"
                                v-for="tag in task.tags"
                            >{{ tag }}</span>
                            </div>
                        </template>

                        <!-- Due Date-->
                        <div
                            class="due-date"
                            v-if="task.due_date"
                        >
                            <span>{{ displayDueDate( task.due_date ) }}</span>
                        </div>
                    </div>
                </div>
            </div>

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
import {diffDate, format} from "@/core/shared/utils";

const props = defineProps({
    task: {
        type: Task,
        required: true
    },

    listSettings: {
        type: Object,
        required: true
    },
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
            },

            {
                name: "Move this task to",
                children: [
                    {
                        name: "Todolist",
                        action: () => {
                            console.log(1);
                        }
                    }
                ]
            }
        ]
    });
});

function toggleTaskStatus() {
    const task = props.task;
    const type = !task.finish;

    accessor.setTaskSpecialProp(task.id, "finish", type).then(r => {
        task.finish = type;
    });
}

function setTaskImportantStatus() {
    const task = props.task;
    const status = ! task.important;

    accessor.setTaskSpecialProp(task.id, "important", status).then(list_id_list => {
        task.important = status;
        todo.updateSpecialLists( task, list_id_list, status );
    });
}

function displayDueDate( date ) {
    const days = diffDate( date );
    const noun = Math.abs( days ) <= 1 ? "day" : "days";

    return `${days} ${noun} left`;
}
</script>