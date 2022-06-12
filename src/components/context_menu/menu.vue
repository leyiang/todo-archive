<style>
.context-menu {
    width: 220px;
    position: absolute;
    box-shadow: 0 0 10px rgba(0, 0, 0, .5);
    background: #FFF;

    display: flex;
    flex-direction: column;
}

.context-menu-item {
    padding: 1rem;
}

.context-menu-item:hover {
    background-color: #F9F9F9;
}
</style>

<template>
    <div
        class="context-menu"
        v-if="menuSpec"
        v-show="pos"
        :style="style"
    >
        <button
            v-for="item in menuSpec.items"
            class="context-menu-item"
            @click="item.action"
        >{{ item.name }}</button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { Ref } from "vue";
import { getSpec } from "./data";

const pos: Ref<null|{x: number, y: number}> = ref(null);
const defaultSpec = null;
// const defaultSpec = {
//     items: [
//         {
//             name: "Default Item",
//             action: () => {
//                 console.log( 1 );
//             }
//         }
//     ]
// };

const menuSpec: Ref<{} | null> = ref( defaultSpec );

const style = computed(() => {
    let x = pos.value?.x || 0;
    let y = pos.value?.y || 0;

    return {
        transform: `translate(${x}px, ${y}px)`
    }
});

onMounted(() => {
    window.addEventListener("contextmenu", (e) => {
        let spec = null;

        if( e.target instanceof HTMLElement ) {
            spec = getSpec( e.target );
        }

        if( defaultSpec || spec ) {
            e.preventDefault();
            menuSpec.value = spec || defaultSpec;

            pos.value = {
                x: e.clientX,
                y: e.clientY
            }
        } else {
            pos.value = null;
        }
    });

    window.addEventListener("click", e => {
        if( pos.value ) {
            pos.value = null;
        }
    });
});
</script>