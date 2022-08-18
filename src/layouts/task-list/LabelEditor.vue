<script setup lang="ts">
import Modal from "@/components/common/Modal.vue";
import TaskLabel from "./plan/TaskLabel.vue";
import type Task from "@/core/model/Task";
import {ref} from "vue";
import {adapter, useTodoStore} from "@/stores/TodoStore";

const todo = useTodoStore();
const newLabel = ref("");
const props = defineProps<{
    task: Task
}>();

const { task } = props;
function addNewLabel() {
    const { value: label } = newLabel;
    newLabel.value = "";
    if( label.length === 0 ) return;

    if( ! task.labels.includes(label) ) {
        task.labels.push( label );
        update();
    }
}

function removeLabel() {
    if( newLabel.value.length === 0 ) {
        if( task.labels.length !== 0 ) {
            task.labels.pop();
            update();
        }
    }
}

function update() {
    adapter.setTaskLabels(task.id, JSON.parse(JSON.stringify(task.labels)));
}
</script>

<template>
    <Modal v-if="task" @close="todo.editingLabelTask = null">
        <template #header>
            <h4 class="m0">Editing Label for {{ '<' + task.name + '>' }}</h4>
        </template>

        <div class="label-editor" data-test="label-editor">
            <div class="flex b-1 border-gray-300 rounded gap-1rem flex-wrap min-h-50px leading-24px p-.5rem items-center box-border">
                <TaskLabel
                    v-for="label in task.labels"
                    :name="label"
                />

                <input
                    v-focus
                    data-test="label-editor-input"
                    type="text"
                    class="flex-1 w-20px min-w-unset b-none outline-none"
                    v-model.trim="newLabel"
                    @keydown.enter="addNewLabel"
                    @keydown.delete="removeLabel"
                >
            </div>
        </div>
    </Modal>
</template>