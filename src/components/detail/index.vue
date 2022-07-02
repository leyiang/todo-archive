<template>
    <div
        class="task-detail flex gap-4 flex-col "
    >
        <div class="bg-white p-3 h-1/2 overflow-y-auto">
            <div class="">
                <StepWrap
                    class="flex items-start"
                    :finish="task.finish"
                >
                    <IconColumn
                        class="mt-2"
                    >
                        <FinishButton
                            class="text-2xl"
                            :finish="task.finish"
                            @click="toggleStatus"
                        />
                    </IconColumn>

                    <h1 class="text-xl flex-1">
                        <ResizableTextarea
                            :key="task.id"
                            class="p-2 w-full"
                            :content="task.name"
                            @change="updateTaskName"
                        />
                    </h1>
                </StepWrap>
            </div>

            <div class="flex flex-col mt-5">
                <StepItem
                    v-for="step in normalSteps"
                    :step="step"
                />
            </div>

            <div
                class="flex"
                v-if="completedSteps.length"
            >
                <button
                    class="completed-toggle text-white flex items-center"
                    @click="showCompleted = ! showCompleted"
                >
                    <span>Completed</span>

                    <Icon
                        icon="ic:baseline-keyboard-arrow-down"
                        :class="['icon-svg ml-2', showCompleted ? 'showCompleted' : '' ]"
                    />
                </button>
            </div>

            <div
                class="flex flex-col mt-5"
                v-if="showCompleted"
            >
                <StepItem
                    v-for="step in completedSteps"
                    :step="step"
                />
            </div>
            <div class="mt-1">
                <AddNewInput
                    placeholder="Add a task"
                    @submit="addNewStep"
                    maxlength="50"
                />
            </div>
        </div>

        <div class="bg-white flex-3 h-1/3">
            <textarea
                placeholder="Add notes"
                class="w-full h-full p-3"
                @change="updateNotes"
                v-model="task.notes"
            >{{ task.notes }}</textarea>
        </div>
    </div>
</template>

<script setup>
import FinishButton from "@/components/FinishButton.vue"
import { Icon } from "@iconify/vue";
import AddNewInput from "@/components/AddNewInput.vue"
import IconColumn from "@/components/IconColumn.vue";
import StepWrap from "@/components/StepWrap.vue";
import StepItem from "./StepItem.vue";
import { useTodoStore } from "@/stores/todo";
import accessor from "@/core/accessor/AccessorInstance";
import Task from "@/core/model/Task";
import ResizableTextarea from "@/components/ResizableTextarea.vue";
import { computed, ref } from "vue";

const todo = useTodoStore();
const props = defineProps({
    task: {
        type: Task,
        required: true
    }
})

const normalSteps = computed(() => {
    return props.task.steps.filter(step => {
        return step.finish === false;
    });
})

const completedSteps = computed(() => {
    return props.task.steps.filter(step => {
        return step.finish === true;
    });
})

const showCompleted = ref(false);


function toggleStatus() {
    if (props.task) {
        const type = !props.task.finish;

        accessor.setTaskFinishStatus(props.task.id, type).then(r => {
            /**
             * Missing Reactive
             * Use this hack to let it work
             * @type {boolean}
             */
            props.task.finish = !type;
            props.task.finish = type;

            todo.setTaskStatus(props.task.id, type);
        });
    }
}

function addNewStep(name) {
    name = name.trim();
    if (name.length === 0) return;

    if (props.task) {
        accessor.addStep(name, props.task.id).then(step => {
            props.task.steps.push(step);
        });
    }
}

function updateNotes() {
    accessor.updateTaskProp(props.task.id, "notes", props.task.notes).then(r => {

    });
}

function updateTaskName(e) {
    const name = e.target.value;

    accessor.updateTaskProp(props.task.id, "name", name).then(r => {
        props.task.name = name;
    });
}
</script>

<style>
.task-detail {
    max-width: 440px;
    background-color: #F3F3F3;
}

.items-start {
    position: sticky;
    top: 0;
}

.completed-toggle {
    background: rgba(0, 0, 0, 0.5);
    padding: .5rem 1rem;
    border-radius: 5px;
}

.icon-svg.showCompleted {
    transform: rotate(180deg);
}
</style>
