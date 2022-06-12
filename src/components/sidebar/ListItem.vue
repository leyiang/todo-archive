<style>
.sidebar-item {
    padding: 1rem;
}
.list-icon {
    margin-left: -10px;
    font-size: 20px;
}
</style>

<template>
    <button
        class="sidebar-item flex justify-between w-full py-4 hover:bg-blue-50"
        ref="el"
        data-menu-id="list-item"
    >
        <div class="flex items-center">
            <IconColumn
                v-if="list.icon"
                class="list-icon"
            >
                <Icon
                    :icon="list.icon"
                />
            </IconColumn>

            <span class="">{{ list.name }}</span>
        </div>

        <IconColumn>
            <span class=text-gray-400>{{ openTasksLength }}</span>
        </IconColumn>
    </button>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
import IconColumn from "@/components/IconColumn.vue"
import List from "@/core/model/List";
import {computed, ref, onMounted} from "vue";
import type {Ref} from "vue";
import {registerMenu} from "@/components/context_menu/data";
import accessor from "@/core/accessor/AccessorInstance";
import {useTodoStore} from "@/stores/todo";

const props = defineProps({
    list: {
        type: List,
        required: true
    }
});

const openTasksLength = computed(() => {
    return props.list.tasks.reduce((total, task) => {
        if( ! task.finish ) {
            return total + 1;
        } else {
            return total;
        }
    }, 0)
});

const el: Ref<null|HTMLElement> = ref(null);
const todo = useTodoStore();

onMounted(() => {
    if( el.value instanceof HTMLElement ) {
        registerMenu(el.value, {
            items: [
                {
                    name: "Remove List",
                    action: () => {
                        accessor.removeTaskList( props.list.id ).then( r => {
                            todo.removeTaskList( props.list );
                        });
                    }
                }
            ]
        });
    }
});
</script>