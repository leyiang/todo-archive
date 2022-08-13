<script setup lang="ts">
import {adapter, useTodoStore} from "@/stores/TodoStore";
import FolderItem from "@/layouts/folder-list/FolderItem.vue";
import FolderListAddNew from "./FolderListAddNew.vue";
import Modal from "@/components/common/Modal.vue";
import { computed } from "vue";
import type Folder from "@/core/model/folder/Folder";

const todoStore = useTodoStore();

const folders = computed(() => {
    const copy = (todoStore.folders || []).slice();
    copy.sort((folder, folder1) => {
        return folder.order - folder1.order;
    });

    return copy;
});

/**
 * Update folder order through adapter
 * @param folder
 */
function updateFolderOrder( folder: Folder | null ) {
    if( folder !== null ) {
        const order = Number( folder.order );
        adapter.setFolderProp( folder.id, "order", order ).then(() => {
            // Nothing todo here.
        });
    }
}

function updateFolderFilterOptions( folder: Folder | null ) {
    if( folder !== null ) {
        const options = JSON.parse( JSON.stringify(folder.filterOptions) ) ;
        adapter.setFolderProp( folder.id, "filterOptions", options ).then(() => {
            // Nothing
        });
    }
}
</script>

<template>
    <div
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

            <div flex flex-col gap-1rem>
                <fieldset rounded p-1rem border-gray-100>
                    <legend>Attributes</legend>

                    <div class="flex justify-between items-center">
                        <span>Order</span>
                        <input
                            type="text"
                            v-model="todoStore.settingFolder.order"
                            @change="updateFolderOrder( todoStore.settingFolder )"
                        >
                    </div>
                </fieldset>

                <fieldset rounded p-1rem border-gray-100>
                    <legend>Filter Options</legend>

                    <div class="flex justify-between items-center">
                        <span>Today</span>

                        <input
                            type="checkbox"
                            v-model="todoStore.settingFolder.filterOptions.today"
                            @change="updateFolderFilterOptions( todoStore.settingFolder )"
                        >
                    </div>

                    <div class="flex justify-between items-center">
                        <span>All</span>

                        <input
                            type="checkbox"
                            v-model="todoStore.settingFolder.filterOptions.all"
                            @change="updateFolderFilterOptions( todoStore.settingFolder )"
                        >
                    </div>
                </fieldset>
            </div>
        </Modal>
    </div>
</template>