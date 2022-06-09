<template>
    <button class="sidebar-item flex justify-between w-full py-4 hover:bg-blue-50">
        <div class="flex items-center">
            <IconColumn>
                <Icon icon="ic:outline-wb-sunny" />
            </IconColumn>
            <span class="">Invitation</span>
        </div>

        <IconColumn>
            <span class=text-gray-400>5</span>
        </IconColumn>
    </button>
</template>

<script setup>
import { Icon } from "@iconify/vue"
import IconColumn from "@/components/IconColumn.vue"
</script>