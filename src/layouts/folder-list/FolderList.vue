<script setup lang="ts">
import {useTodoStore} from "@/stores/TodoStore";
import FolderItem from "@/layouts/folder-list/FolderItem.vue";
import FolderListAddNew from "./FolderListAddNew.vue";
import Modal from "@/components/common/Modal.vue";
import { computed } from "vue";

const todoStore = useTodoStore();

const folders = computed(() => {
    const copy = (todoStore.folders || []).slice();
    copy.sort((folder, folder1) => {
        return folder.order - folder1.order;
    });

    return copy;
});
</script>

<template>
    <aside
        class="flex flex-col p-1rem"
        data-test="folder-list"
    >
        <div class="list flex-1 flex flex-col gap-2px">
            <FolderItem
                v-for="folder in folders"
                :folder="folder"
            />
        </div>

        <FolderListAddNew />

        <Modal
            data-test="folder-setting-modal"
            v-if="todoStore.settingFolder"
            @close="todoStore.settingFolder = null"
        >
            <template #header>
                <h4
                    data-test="folder-setting-current-folder"
                    my-0
                >Setting: {{ todoStore.settingFolder.name }}</h4>
            </template>

            Main Content
        </Modal>
    </aside>
</template>