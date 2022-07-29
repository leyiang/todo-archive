<script setup lang="ts">
import ContextMenuItem from "./ContextMenuItem.vue";
import {computed, onMounted, type Ref, ref} from "vue";
import {useRightClick} from "@/composables/useRightClick";
import {type menuSpecItem, menuSpecMap} from "@/components/common/context-menu/ContextMenuData";
import {useEventListener} from "@/composables/useEventListener";
import {useClickOutside} from "@/composables/useClickOutside";
import ContextMenuList from "./ContextMenuList.vue";

const menus: Ref<menuSpecItem[]> = ref([]);
const show = ref(false);
const pos = useRightClick();
const width = 300;

const menuPosStyle = computed(() => {
    let { x, y } = pos.value;

    if( x + width > window.innerWidth ) {
        x = window.innerWidth - width - 10;
    }

    return {
        transform: `translate(${ x }px, ${ y }px)`,
        "--width": width + "px",
    }
});

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

const menuList = ref<InstanceType<typeof ContextMenuList>>();
onMounted(() => {
    const el = menuList.value?.$el;

    if( el instanceof HTMLElement ) {
        useClickOutside( el, () => {
            if( show.value === true ) {
                show.value = false;
            }
        });
    }
});

function closeMenu() {
    show.value = false;
}

useEventListener("contextmenu", e => {
    const target = getRealTarget( e.target as HTMLElement );

    if( menuSpecMap.has( target ) ) {
        e.preventDefault();
        menus.value = menuSpecMap.get( target );
        show.value = true;
    } else {
        closeMenu();
    }
});
</script>

<template>
    <ContextMenuList
        v-show="show"
        :style="menuPosStyle"
        @close="closeMenu"
        ref="menuList"
    >
        <ContextMenuItem
            v-for="item in menus"
            :spec="item"
        />
    </ContextMenuList>
</template>