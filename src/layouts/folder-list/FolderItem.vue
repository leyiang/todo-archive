<script setup lang="ts">
import Folder from "@/core/model/folder/Folder";
import {adapter, useTodoStore} from "@/stores/TodoStore";
import {computed, onMounted, Ref, ref} from "vue";
import { addNewMenu } from "@/components/common/context-menu/ContextMenuData";

const todoStore = useTodoStore();
const props = defineProps({
    folder: {
        type: Folder,
        required: true,
    }
});

const currentFolderActive = computed(() => {
    return todoStore.activeFolder === props.folder;
});

function setActive() {
    todoStore.setActiveFolder( props.folder );
}

const el: Ref<HTMLElement | null> = ref(null);
onMounted(() => {
    if( el.value !== null ) {
        addNewMenu( el.value, [
            {
                name: "Remove Folder",
                action: () => {
                    adapter.removeFolder( props.folder.id ).then( r => {
                        todoStore.removeFolder( props.folder );
                    });
                }
            }
        ]);
    }
});
</script>

<template>
    <button
        data-test="folder-item"
        data-context-trigger
        class="folder-item text-4 p-1rem bg-transparent border-none
               hover:(bg-gray-200) rounded flex justify-between
        "
        :class="{ 'bg-gray-200' : currentFolderActive }"
        @click="setActive"
        ref="el"
    >
        <span>{{ folder.name }}</span>
        <span class="text-gray-400">1</span>
    </button>
</template>