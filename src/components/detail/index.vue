<style>
.task-detail {
    max-width: 340px;
    background-color: #F9F9F9;
}

</style>

<template>
    <div class="task-detail">
        <div class="bg-white p-5">
            <div class="flex items-center">
                <IconColumn>
                    <FinishButton class="text-2xl" />
                </IconColumn>

                <h1 class="text-xl">
                    <GhostInput
                        :value="123123"
                    />
                </h1>
            </div>

            <AddNewInput
                placeholder="12312312"
            />


        </div>
    </div>
</template>

<script setup>
import FinishButton from "@/components/FinishButton.vue"
import AddNewInput from "@/components/AddNewInput.vue"
import IconColumn from "@/components/IconColumn.vue";
import GhostInput from "@/components/GhostInput.vue";
</script>