<script setup lang="ts">
import type { menuSpecItem } from './ContextMenuData';
import ContextMenuList from "./ContextMenuList.vue";
import { Icon } from "@iconify/vue";
import { onMounted, ref } from 'vue';

const props = defineProps<{
    spec: menuSpecItem
}>();

const emit = defineEmits(["close"]);

function triggerAction() {
    props.spec.action?.();
    emit("close");
}

</script>

<template>
    <li
        list-none relative
        class="menu-item"
    >
        <button
            btn-reset w-full flex justify-between
            class="px-1rem py-5px hover:bg-gray-300 text-left"
            @click="triggerAction"
        >
            <span>{{ spec.name }}</span>

            <Icon 
                v-if="spec.children"
                icon="ic:baseline-keyboard-arrow-right"
            />
        </button>

        <ContextMenuList
            v-if="spec.children"
            class="child-menu"
            absolute left-full top-0
        >
            <ContextMenuItem
                v-for="child in spec.children"
                :spec="child"
            />
        </ContextMenuList>
    </li>
</template>

<style>
.child-menu {
    display: none;
}

.menu-item:hover > .child-menu {
    display: flex;
}
</style>