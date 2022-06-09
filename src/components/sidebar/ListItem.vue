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
    <button class="sidebar-item flex justify-between w-full py-4 hover:bg-blue-50">
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
            <span class=text-gray-400>5</span>
        </IconColumn>
    </button>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
import IconColumn from "@/components/IconColumn.vue"
import List from "@/core/model/List";

const props = defineProps({
    list: {
        type: List,
        required: true
    }
});
</script>