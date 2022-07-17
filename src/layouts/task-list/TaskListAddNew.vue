<script setup lang="ts">
import AddNewInput from "@/components/common/AddNewInput/AddNewInput.vue";
import {adapter, useTodoStore} from "@/stores/TodoStore";
import Folder from "@/core/model/folder/Folder";
import type {rawTask} from "@/core/model/rawTypes";
import Task from "@/core/model/Task";
import { getTodayString } from "@/shared/utils";

const todoStore = useTodoStore();

function addNewTask( value: string ) {
    if( todoStore.activeFolder instanceof Folder ) {
        const folder = todoStore.activeFolder;
        
        if( folder.filterOptions.today ) {
            adapter.addTask(value, 0).then((raw: rawTask) => {
                const task = Task.Load( raw );

                adapter.setTaskProp( task.id, "date", getTodayString() ).then( affecting => {
                    affecting.forEach( id => {
                        const folder = todoStore.taskMap[ id ];

                        if( folder instanceof Folder ) {
                            folder.plans.push( task );
                        }
                    })
                });
            });
        } else {
            adapter.addTask(value, folder.id).then((raw: rawTask) => {
                const task = Task.Load( raw );
                folder.plans.push( task );
            });
        }
    }
}

</script>

<template>
    <AddNewInput
        data-test="task-add-new"
        type="text"
        class="
             p-1rem rounded border-transparent placeholder-gray-100
             text-white text-4 outline-none bg-gray-900/30 font-semibold
        "
        @add="addNewTask"
        placeholder="Add new Task :)"
    />
</template>