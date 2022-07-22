<script setup lang="ts">
import {computed, nextTick, onMounted, type Ref, ref, watch} from "vue";

const el: Ref<null | HTMLTextAreaElement> = ref(null);
const height: Ref<"auto" | number> = ref("auto");

const props = defineProps({
    minHeight: {
        type: Number,
    },

    maxHeight: {
        type: Number,
    }
});

const style = computed(() => ({
    resize: "none",
    overflow: "auto",

    height: typeof height.value === "number"
        ? height.value + "px"
        : height.value
}));

function resize() {
    if( el.value === null ) return;
    height.value = "auto";

    nextTick(() => {
        let contentHeight = el.value?.scrollHeight as number;

        if( props.minHeight !== undefined ) {
            contentHeight = Math.max( props.minHeight, contentHeight );
        }

        if( props.maxHeight !== undefined ) {
            contentHeight = Math.min( props.maxHeight, contentHeight );
        }

        height.value = contentHeight;
    });
}

onMounted(() => {
    resize();
});

</script>

<template>
    <textarea
        :style="style"
        ref="el"
        @input="resize"
    ></textarea>
</template>