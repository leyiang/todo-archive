<script setup lang="ts">
import {adapter, useTodoStore} from "@/stores/TodoStore";
import type {rawFolder} from "@/core/model/rawTypes";
import Folder from "@/core/model/folder/Folder";
import { Icon } from "@iconify/vue";
import {isNameEmpty} from "@/shared/utils";

const todoStore = useTodoStore();
function addNewFolder( e: KeyboardEvent ) {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    /**
     * Empty Folder name will not be added
     */
    if( isNameEmpty(value) ) {
        return;
    }

    adapter.addFolder(value).then( (raw: rawFolder) => {
        const folder = Folder.Load( raw );
        todoStore.addFolder( folder );
    });

    target.value = "";
}
</script>

<template>
    <label
        class="folder-add-new-warp flex items-center"
        data-test="folder-add-new"
    >
        <Icon icon="ic:outline-plus" class="text-6" />

        <input
            type="text"
            class="border-none p-1rem rounded text-4 folder-add-new-input
                   w-full border-box outline-none pl-.5rem
            "
            @keydown.enter="addNewFolder"
            placeholder="Add new folder"
        >
    </label>
</template>