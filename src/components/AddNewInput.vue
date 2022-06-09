<style>
.task-input {
    tab-index: 1;
}

.task-input input {
    background: transparent;
    outline: none;
}

.task-input input::placeholder {
    color: currentColor;
}

.task-input .iconify {
    color: currentColor;
}

.plus-wrap {
    width: 40px;
}
</style>

<template>
    <div class="flex items-center task-input rounded">
        <IconColumn>
            <Icon
                icon="ic:sharp-plus"
                class="text-xl"
            />
        </IconColumn>

        <input
            type="text"
            class="p-4 w-full f1 pl-0"
            placeholder="Add a task"
            v-bind="$attrs"
        >
    </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import IconColumn from "@/components/IconColumn.vue";

export default {
    inheritAttrs: false,
    components: {
        IconColumn,
        Icon
    }
}
</script>