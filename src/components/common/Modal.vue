<script setup lang="ts">
import {computed} from "vue";

const emit = defineEmits(["close"]);
const props = defineProps({
    width: {
        type: [Number, String],
        default: 400,
    },

    height: {
        type: [Number, String],
        default: 400
    }
});

const style = computed(() => {
    return {
        width: props.width + "px",
        height: props.height + "px",
        maxHeight: props.height + "px",
        overflow: "auto",
    }
});
</script>

<template>
    <div class="modal-wrap z-10">
        <div
            position-absolute
            inset-0
            bg="black op-50"
            @click="emit('close')"
        ></div>
        
        <div
            rounded bg-white position-absolute
            top-100px shadow-xl
            border="~ gray op-30"
            style="left: 50%; transform: translateX(-50%)"
            flex="~ col"
        >
            <header
                p-1rem
                border="b-1 gray-300"
            >
                <slot name="header"></slot>
            </header>

            <main
                :style="style"
                p-1rem
                flex-1
            >
                <slot></slot>
            </main>

            <footer
                p-1rem
                border="t-1 gray-300"
                flex
            >
                <button
                    data-test="close-modal-button"
                    btn-reset
                    btn-action
                    ml-auto
                    @click="emit('close')"
                >Close</button>
                <slot name="footer"></slot>
            </footer>
        </div>
    </div>
</template>