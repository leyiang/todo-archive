<style>
.sub-menu,
.context-menu {
    width: 280px;
    position: absolute;
    box-shadow: 0 0 10px rgba(0, 0, 0, .5);
    background: #FFF;

    display: flex;
    flex-direction: column;
}

.context-menu-item {
    padding: 10px 1rem;
    text-align: left;
}

.context-menu-item:hover {
    background-color: #F9F9F9;
}

.menu-item-wrap.has-sub {
    position: relative;
}

.menu-item-wrap.has-sub:hover .sub-menu {
    display: flex;
}

.sub-menu {
    display: none;
    position: absolute;
    left: 100%;
    top: 0;
}
</style>

<template>
    <div
        class="context-menu"
        v-if="menuSpec"
        v-show="pos"
        :style="style"
        ref="el"
    >
        <div
            v-for="item in menuSpec.items"
            :class="['menu-item-wrap', item.children ? 'has-sub' : '' ]"
        >
            <button
                class="context-menu-item w-full flex items-center justify-between"
                @click="trigger(item.action, item.args, $event)"
            >
                <span>{{ item.name }}</span>
                <Icon
                    icon="ic:baseline-keyboard-arrow-right"
                    v-if="item.children"
                ></Icon>
            </button>

            <div
                class="sub-menu flex-col"
                v-if="item.children"
            >
                <button
                    class="context-menu-item w-full"
                    v-for="sub in item.children"
                    @click="trigger(sub.action)"
                >
                    <span>{{ sub.name }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { Ref } from "vue";
import { getSpec } from "./data";
import { Icon } from "@iconify/vue";

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

let target: Element | null = null;
const el: Ref<null|Element> = ref(null);

onMounted(() => {
    window.addEventListener("contextmenu", (e) => {
        let spec = null, el = null;

        if( e.target instanceof Element ) {
            const raw = getSpec( e.target );

            if( raw !== null ) {
                [spec, el] = raw;
            }
        }

        if( defaultSpec || spec ) {
            e.preventDefault();
            target = el;
            menuSpec.value = spec || defaultSpec;

            pos.value = {
                x: e.clientX,
                y: e.clientY
            }
        } else {
            pos.value = null;
            target = null;
        }
    });

    window.addEventListener("click", e => {
        if( pos.value ) {
            pos.value = null;
        }
    });

    window.addEventListener("keydown", e => {
        if( pos.value ) {
            if( e.key === "Escape" ) {
                pos.value = null;
            }

            if( ["Tab", "ArrowDown"].includes(e.key) ) {
                e.preventDefault();
                selectNextItem();
            }

            if( e.key === "ArrowUp" ) {
                e.preventDefault();
                selectNextItem( true );
            }
        }
    });
});

let currentFocus: null | Element = null;

function selectNextItem(reverse=false) {
    if( ! el.value ) return;

    let defaultValue = reverse
        ? el.value?.lastElementChild
        : el.value?.firstElementChild;

    if( ! (defaultValue instanceof Element) ) return;

    if( ! (currentFocus instanceof Element) ) {
        currentFocus = defaultValue;
    } else {
        const next = reverse
            ? currentFocus.previousElementSibling
            : currentFocus.nextElementSibling;

        currentFocus = next || defaultValue;
    }

    if( currentFocus instanceof HTMLElement ) {
        currentFocus.focus();
    }
}

function trigger( callback:Function|undefined, args:{}, event: Event) {
    if( ! callback ) return;
    callback( args, target );
}
</script>