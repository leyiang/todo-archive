<script setup lang="ts">
import AddNewInput from "@/components/common/AddNewInput/AddNewInput.vue";
import {adapter, useTodoStore} from "@/stores/TodoStore";
import type {rawFolder} from "@/core/model/rawTypes";
import Folder from "@/core/model/folder/Folder";
import { Icon } from "@iconify/vue";

const todoStore = useTodoStore();
function addNewFolder( value: string ) {
    adapter.addFolder(value).then( (raw: rawFolder) => {
        const folder = Folder.Load( raw );
        todoStore.addFolder( folder );
    });
}
</script>

<template>
    <label
        class="folder-add-new-warp flex items-center"
    >
        <Icon icon="ic:outline-plus" class="text-6" />

        <AddNewInput
            data-test="folder-add-new"
            class="border-none p-1rem rounded text-4 folder-add-new-input
                   full border-box outline-none pl-.5rem
            "
            @add="addNewFolder"
            placeholder="Add New Folder"
            :max-length="32"
        />
    </label>
</template>