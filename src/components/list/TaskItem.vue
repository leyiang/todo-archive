<style>

</style>

<template>
    <div class="task-item flex bg-white rounded p-5 text-lg">
        <FinishButton />

        <span>This is the task name</span>
        
        <button class="text-2xl ml-auto">
            <Icon icon="ic:round-star-border" />
        </button>
    </div>
</template>

<script setup>
import FinishButton from "@/components/FinishButton.vue";
import { Icon } from "@iconify/vue";
</script>
