<style scoped>
.todo-aside {
    max-width: 340px;
}

.todo-aside .sidebar-item:first-of-type {
    margin-top: -10px;
}

.sidebar-item.active {
    background: rgb(239 246 255 / 1)
}
</style>

<template>
    <aside class="todo-aside py-5 flex flex-col">
        <div class="flex flex-col defaultList">
            <ListItem
                v-for="list in defaultList"
                :list="list"
                :class="['', activeList.focusing.id === list.id ? 'active' : '' ]"
                @click="focusList( list )"
            />
        </div>

        <div class="flex flex-col userList mt-8">
            <ListItem
                v-for="list in userList"
                :list="list"
                @click="focusList( list )"
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
import { useListStore } from "@/stores/list";
import List from "@/core/model/List";
import { ref, computed } from "vue";
import type { Ref, ComputedRef } from "vue";
import accessor from "@/core/accessor/AccessorInstance";

const activeList = useListStore();
const lists : Ref<List[]> = ref([]);

/**
 * Computed
 */
const defaultList : ComputedRef<List[]> = computed(() => {
    return lists.value.filter( list => list.isDefault = true );
});

const userList : ComputedRef<List[]> = computed(() => {
    return lists.value.filter( list => ! list.isDefault );
});

// accessor.addTaskList("My Day", "ic:outline-wb-sunny", true);
// accessor.addTaskList("Important", "ic:round-star-border", true);
// accessor.addTaskList("All", "ic:baseline-list-alt", true);

accessor.getTaskLists().then( loaded => {
    lists.value = loaded;

    if( defaultList.value[0] ) {
        focusList(defaultList.value[0]);
        console.log( defaultList.value[0] );
    }
});

function addNewList( name: string ) {
    accessor.addTaskList(name).then( list => {
        lists.value.push( list );
    });
}

function focusList( list: List ) : void {
    activeList.focus( list );
}
</script>