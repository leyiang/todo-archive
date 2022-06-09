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
            />
        </div>
    </aside>
</template>

<script setup lang="ts">
// Components
import ListItem from "./ListItem.vue";
import AddNewInput from "@/components/AddNewInput.vue";

import List from "@/core/model/List";
import { inject, ref } from "vue";
import type { Ref } from "vue";
import type {iAccessor} from "@/core/accessor/iAccessor";

const lists : Ref<List[]> = ref([]);
const accessor : iAccessor | undefined = inject("accessor");

if( accessor ) {
    accessor.getTaskLists().then( loaded => {
        lists.value = loaded;
    });
}

const defaultList : Array<List> = [
    new List("day", "My Day", "ic:outline-wb-sunny"),
    new List("important", "Important", "ic:round-star-border"),
    new List("all", "All", "ic:baseline-list-alt"),
];

</script>