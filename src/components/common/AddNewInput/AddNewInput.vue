<script lang="ts">
export default {
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import {isNameEmpty} from "@/shared/utils";
import { ref } from "vue";
import AInput from "../AInput.vue";

const props = defineProps<{
    maxLength?: number,
}>();

const emit = defineEmits(["add"]);
const content = ref("");

function onEnter( e: KeyboardEvent ) {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    /**
     * Clear Input
     */
    target.value = "";

    /**
     * Empty Value will not trigger @add Event
     */
    if( isNameEmpty(value) ) return;

    /**
     * Reset Input
     */
    emit("add", value);
}
</script>

<template>
    <div class="add-new-input-wrap" position-relative flex w-full>
        <a-input
            v-bind="$attrs"
            v-model="content"
            flex-1
            @keydown.enter="onEnter"
            pr-5rem
            :maxlength="maxLength"
        />

        <small
            v-if="maxLength !== undefined"
         text-gray-500 position-absolute right-1rem pointer-events-none
         color-current
            style="top: 50%; transform: translateY(-50%)"
        >({{ content.length }}/{{ maxLength }})</small>
    </div>
</template>