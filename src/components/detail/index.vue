<style>
.task-detail {
    max-width: 340px;
    background-color: #F9F9F9;
}

</style>

<template>
    <div class="task-detail">
        <div class="bg-white p-3">
            <div class="flex items-center">
                <IconColumn>
                    <FinishButton
                        class="text-2xl"
                    />
                </IconColumn>

                <h1 class="text-xl">
                    <GhostInput
                        value="Task Title"
                    />
                </h1>
            </div>

            <div class="flex flex-col mt-5">
                <StepItem
                    v-for="i in 5"
                />
            </div>

            <div class="mt-1">
                <AddNewInput
                    placeholder="Add a task"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import FinishButton from "@/components/FinishButton.vue"
import AddNewInput from "@/components/AddNewInput.vue"
import IconColumn from "@/components/IconColumn.vue";
import GhostInput from "@/components/GhostInput.vue";
import StepItem from "./StepItem.vue";
</script>