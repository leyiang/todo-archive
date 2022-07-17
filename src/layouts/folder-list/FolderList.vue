<script setup lang="ts">
import {useTodoStore} from "@/stores/TodoStore";
import FolderItem from "@/layouts/folder-list/FolderItem.vue";
import FolderListAddNew from "./FolderListAddNew.vue";
import Modal from "@/components/common/Modal.vue";

const todoStore = useTodoStore();
</script>

<template>
    <aside
        class="flex flex-col p-1rem"
        data-test="folder-list"
    >
        <div class="list flex-1 flex flex-col gap-2px">
            <FolderItem
                v-for="folder in todoStore.folders"
                :folder="folder"
            />
        </div>

        <FolderListAddNew />

        <Modal>
            <template #header>
                <h4 my-0>Setting: Todo List</h4>
            </template>

            Main Content
        </Modal>
    </aside>
</template>