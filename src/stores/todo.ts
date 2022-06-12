import { defineStore } from "pinia";
import type List from "@/core/model/List";
import type Task from "@/core/model/Task";
import accessor from "@/core/accessor/AccessorInstance";
import { splice } from "@/core/shared/utils";
import type Step from "@/core/model/Step";

export const useTodoStore = defineStore("list", {
    state: () => {
        const data : {
            lists: List[],
            list: List | null
            task: Task | null
        } = {
            lists: [],
            list: null,
            task: null,
        }

        return data;
    },

    actions: {
        getList() {
            accessor.getTaskLists().then( loaded => {
                this.lists = loaded;
                this.setList( loaded[0] );
                console.log( this.lists );
            });
        },

        setList( list : List ) {
            this.list = list;
        },

        toggleTask( task: Task ) {
            if( this.task === task ) {
                this.task = null;
            } else {
                this.task = task;
            }
        },

        addList( list: List ) {
            this.lists.push( list );
        },

        removeTask( task: Task ) {
            const index = this.lists.findIndex( list => list.id === task.list_id );
            splice( this.lists[index].tasks, task );
        },

        removeTaskList( list: List ) {
            splice( this.lists, list );
        },

        removeStep( step: Step ) {
            if( this.task ) {
                splice( this.task.steps, step );
            }
        }
    }
});