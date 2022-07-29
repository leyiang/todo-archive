<script setup lang="ts">
import ContextMenuItem from "./ContextMenuItem.vue";
import {computed, nextTick, onMounted, type Ref, ref} from "vue";
import {useRightClick} from "@/composables/useRightClick";
import {type menuSpecItem, menuSpecMap} from "@/components/common/context-menu/ContextMenuData";
import {useEventListener} from "@/composables/useEventListener";
import {useClickOutside} from "@/composables/useClickOutside";

const menus: Ref<menuSpecItem[]> = ref([]);
const show = ref(false);
const pos = useRightClick();
const el: Ref<null | HTMLDivElement> = ref(null);
const width = 300;

const menuPosStyle = computed(() => {
    let { x, y } = pos.value;

    if( x + width > window.innerWidth ) {
        x = window.innerWidth - width - 10;
    }

    return {
        transform: `translate(${ x }px, ${ y }px)`
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
        class="context-menu flex flex-col bg-white absolute py-8px border border-gray-300"
        :class="[`w-${ width }px`]"
        :style="menuPosStyle"
        ref="el"
    >
        <ContextMenuItem
            v-for="item in menus"
            @click="triggerAction(item)"
        >{{ item.name }}</ContextMenuItem>
    </div>
</template>