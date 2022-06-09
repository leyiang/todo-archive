<style>

</style>

<template>
    <div class="task-item flex bg-white rounded text-lg py-5">
        <IconColumn>
            <FinishButton class="text-2xl" />
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
import { defineProps } from "vue";
import Task from "@/core/model/Task";

const props = defineProps({
    task: {
        type: Task,
        require: true
    }
});
</script>