<script setup lang="ts">
import ContextMenuItem from "./ContextMenuItem.vue";
import {computed, onMounted, type Ref, ref} from "vue";
import {useRightClick} from "@/composables/useRightClick";
import {type menuSpecItem, menuSpecMap} from "@/components/common/context-menu/ContextMenuData";
import {useEventListener} from "@/composables/useEventListener";
import {useClickOutside} from "@/composables/useClickOutside";

const menus: Ref<menuSpecItem[]> = ref([]);
const show = ref(false);
const pos = useRightClick();
const el = ref(null);

const menuPosStyle = computed(() => {
    return {
        transform: `translate(${ pos.value.x }px, ${ pos.value.y }px)`
    }
});

function triggerAction( item: menuSpecItem ) {
    item.action();
    show.value = false;
}

function getRealTarget( el: HTMLElement | null ): null | HTMLElement {
    if( el === null ) return null;

    if( el.dataset.contextTrigger !== undefined ) {
        return el;
    }

    if( el.parentElement ) {
        return getRealTarget( el.parentElement );
    }

    return null;
}

onMounted(() => {
    if( el.value !== null ) {
        useClickOutside( el.value, () => {
            if( show.value === true ) {
                show.value = false;
            }
        });
    }
});

useEventListener("contextmenu", e => {
    console.log( e.target );
    const target = getRealTarget( e.target as HTMLElement );

    if( menuSpecMap.has( target ) ) {
        e.preventDefault();
        menus.value = menuSpecMap.get( target );
        show.value = true;
    }
});
</script>

<template>
    <div
        v-show="show"
        class="context-menu flex flex-col bg-white absolute py-8px rounded shadow border border-gray-300 w-300px"
        :style="menuPosStyle"
        ref="el"
    >
        <ContextMenuItem
            v-for="item in menus"
            @click="triggerAction(item)"
        >{{ item.name }}</ContextMenuItem>
    </div>
</template>