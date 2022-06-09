<style>
.todo-aside {
    max-width: 340px;
}

.todo-aside .sidebar-item:first-of-type {
    margin-top: -10px;
}
</style>

<template>
    <aside class="todo-aside py-5 flex flex-col">
        <div class="flex flex-col defaultList">
            <ListItem
                v-for="list in defaultList"
                :list="list"
            />
        </div>

        <div class="flex flex-col userList mt-8">
            <ListItem
                v-for="list in lists"
                :list="list"
            />
        </div>

        <div class="mt-auto">
            <AddNewInput
                placeholder="New List"
                @submit="addNewList"
            />
        </div>
    </aside>
</template>

<script setup lang="ts">
// Components
import ListItem from "./ListItem.vue";
import AddNewInput from "@/components/AddNewInput.vue";

import List from "@/core/model/List";
import { ref } from "vue";
import type { Ref } from "vue";
import accessor from "@/core/accessor/AccessorInstance";
import { toSnakeCase } from "@/core/shared/utils";

const lists : Ref<List[]> = ref([]);
const defaultList : Array<List> = [
    new List(0, "My Day", "ic:outline-wb-sunny"),
    new List(0, "Important", "ic:round-star-border"),
    new List(0, "All", "ic:baseline-list-alt"),
];

accessor.getTaskLists().then( loaded => {
    lists.value = loaded;
});

function addNewList( name: string ) {
    accessor.addTaskList(name).then( list => {
        lists.value.push( list );
    });
}
</script>