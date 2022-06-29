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
        <modal
            v-if="todo.settingList"
            @closeModal="todo.setSettingList(null)"
        >
            <div class="flex justify-between flex-1 py-4">
                <span>Hide tags</span>

                <label for="default-toggle" class="inline-flex relative items-center cursor-pointer">
                    <input
                        type="checkbox"
                        id="default-toggle"
                        class="sr-only peer"
                        v-model="todo.settingList.settings.hideTags"
                        @change="toggleListSetting"
                    >

                    <div
                        class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                    ></div>
                </label>
            </div>
        </modal>
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
import modal from "@/components/Modal.vue";

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

function addNewList( name: string ) {
    name = name.trim();
    if( name.length === 0 ) return;

    accessor.addTaskList(name).then( list => {
        todo.addList( list );
    });
}

function focusList( list: List ) : void {
    todo.setList( list );
}

function toggleListSetting(e: Event) {
    //@ts-ignore
    const status = !! e?.target?.checked;

    if( todo.settingList ) {
        const list = todo.settingList;
        const settings = list.settings;

        settings.hideTags = status;
        const value = JSON.parse( JSON.stringify(settings) );
        accessor.updateTaskListProp( list.id, "settings", value).then( r => {

        });
    }
}
</script>