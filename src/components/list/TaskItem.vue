<style>
.task-item.finished {
    color: #999;
    text-decoration: line-through;
}
</style>

<template>
    <div :class="['task-item flex bg-white rounded text-lg py-5', task.finish ? 'finished' : '' ]">
        <IconColumn>
            <FinishButton
                class="text-2xl"
                @click="$emit('toggleStatus', task)"
                :finish="task.finish"
            />
        </IconColumn>

        <span>{{ task.name }}</span>

        <IconColumn class="ml-auto">
            <button class="text-2xl">
                <Icon icon="ic:round-star-border" />
            </button>
        </IconColumn>
    </div>
</template>

<script setup>
import FinishButton from "@/components/FinishButton.vue";
import { Icon } from "@iconify/vue";
import IconColumn from "@/components/IconColumn.vue";
import Task from "@/core/model/Task";

const props = defineProps({
    task: {
        type: Task,
        require: true
    }
});
</script>