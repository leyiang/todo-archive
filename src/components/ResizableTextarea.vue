<style scoped>
textarea {
    box-sizing: border-box;
    overflow-y: hidden;
}
</style>

<template>
    <textarea
        :style="style"
        ref="el"
        @keydown="updateHeight"
    >{{ content }}</textarea>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { Ref } from "vue";

const el: Ref<null| HTMLTextAreaElement> = ref(null);
const height = ref(0);

const props = defineProps({
    content: {
        type: String,
        default: ''
    }
})

function updateHeight() {
    if( el.value ) {
        let len = getInfo( el.value.value );
        height.value = len * 40;
    }
}

function getInfo( text: string ) {
    const lines = text.split("\n");
    let len = lines.length;
    let row = 32;

    lines.forEach(line => {
        if( line.length > row ) {
            len += Math.floor(line.length / row);
        }
    });

    return len;
}

const style = computed(() => {
    return {
        height: height.value + "px"
    }
});

onMounted(() => {
    updateHeight();
});
</script>