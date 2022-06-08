<style>
.task-detail {
    max-width: 340px;
    background-color: #F9F9F9;
}

</style>

<template>
    <div class="task-detail">
        <div class="bg-white p-5">
            <h4 class="flex text-xl">
                <FinishButton />
                Hello From Detail
            </h4>
        </div>
    </div>
</template>

<script setup>
import FinishButton from "@/components/FinishButton.vue"
</script>