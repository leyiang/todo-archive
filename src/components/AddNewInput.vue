<style>
.task-input {
    background-color: rgba(0, 0, 0, 0.3);
    tab-index: 1;
}

.task-input input {
    background: transparent;
}

.task-input input::placeholder {
    color: #fff;
}

.plus-wrap {
    width: 40px;
}
</style>

<template>
    <div class="flex items-center task-input rounded">
        <span
            class="justify-center items-center flex plus-wrap"
        >
            <Icon
                icon="ic:sharp-plus"
                class="text-xl text-white"
            />
        </span>

        <input
            type="text"
            class="p-4 w-full f1 pl-0"
            placeholder="Add a task"
        >
    </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>