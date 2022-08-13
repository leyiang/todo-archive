<script setup lang="ts">

import {computed} from "vue";
import {useTodoStore} from "@/stores/TodoStore";

const props = defineProps<{
    name: string
}>();

const todoStore = useTodoStore();
const label = computed(() => {
    return todoStore.labelMap[ props.name ] || { textColor: "#000", bgColor: "#EEE" };
});

const style = computed(() => {
    return {
        color: label.value.textColor,
        backgroundColor: label.value.bgColor
    }
});
</script>

<template>
    <small
        class="py-2px px-12px rounded-full h-20px leading-20px"
        :style="style"
    >{{ name }}</small>
</template>