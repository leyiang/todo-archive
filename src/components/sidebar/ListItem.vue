<style>
.sidebar-item {
    padding: 1rem;
}
.list-icon {
    margin-left: -10px;
    font-size: 20px;
}
</style>

<template>
    <button
        class="sidebar-item flex justify-between w-full py-4 hover:bg-blue-50"
        ref="el"
        data-menu-id="list-item"
    >
        <div class="flex items-center">
            <IconColumn
                v-if="list.icon"
                class="list-icon"
            >
                <Icon
                    :icon="list.icon"
                />
            </IconColumn>

            <span class="">{{ list.name }}</span>
        </div>

        <IconColumn>
            <span class=text-gray-400>{{ openTasksLength }}</span>
        </IconColumn>
    </button>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
import IconColumn from "@/components/IconColumn.vue"
import List from "@/core/model/List";
import {computed, onMounted, ref} from "vue";
import type {Ref} from "vue";

const props = defineProps({
    list: {
        type: List,
        required: true
    }
});

const openTasksLength = computed(() => {
    return props.list.tasks.reduce((total, task) => {
        if( ! task.finish ) {
            return total + 1;
        } else {
            return total;
        }
    }, 0)
});
</script>