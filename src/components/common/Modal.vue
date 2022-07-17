<script setup lang="ts">
const emit = defineEmits(["close"]);
</script>

<template>
    <div class="modal-wrap">
        <div
            position-absolute
            inset-0
            bg="black op-50"
            @click="emit('close')"
        ></div>
        
        <div
            rounded bg-white w-400px h-400px position-absolute
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