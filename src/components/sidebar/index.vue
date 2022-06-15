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
        <div class="flex flex-col specialList">
            <ListItem
                v-for="list in specialList"
                :list="list"
                :class="['', todo.list?.id === list.id ? 'active' : '' ]"
                @click="focusList( list )"
            />
        </div>

        <div class="flex flex-col userList mt-6">
            <ListItem
                v-for="list in userList"
                :list="list"
                :class="['', todo.list?.id === list.id ? 'active' : '' ]"
                @click="focusList( list )"
            />
        </div>

        <div class="mt-auto">
            <AddNewInput
                placeholder="New List"
                @submit="addNewList"
                maxlength="30"
            />
        </div>
    </aside>
</template>

<script setup lang="ts">
// Components
import ListItem from "./ListItem.vue";
import AddNewInput from "@/components/AddNewInput.vue";
import { useTodoStore } from "@/stores/todo";
import type List from "@/core/model/List";
import { ref, computed } from "vue";
import type { Ref, ComputedRef } from "vue";
import accessor from "@/core/accessor/AccessorInstance";
import { registerMenu } from "@/components/context_menu/data";

const lists : Ref<List[]> = ref([]);
const todo = useTodoStore();

/**
 * Computed
 */
const specialList : ComputedRef<List[]> = computed(() => {
    return todo.lists.filter( list => list.filterOptions );
});

const userList : ComputedRef<List[]> = computed(() => {
    return todo.lists.filter( list => ! list.filterOptions );
});

todo.getList();

// accessor.factory();
//
function addNewList( name: string ) {
    accessor.addTaskList(name).then( list => {
        todo.addList( list );
    });
}

function focusList( list: List ) : void {
    todo.setList( list );
}
</script>