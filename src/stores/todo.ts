import { defineStore } from "pinia";
import type List from "@/core/model/List";
import type Task from "@/core/model/Task";

export const useTodoStore = defineStore("list", {
    state: () => {
        const data : {
            list: List | null
            task: Task | null
        } = {
            list: null,
            task: null,
        }

        return data;
    },

    actions: {
        setList( list : List ) {
            this.list = list;
        },

        setTask( task: Task ) {
            this.task = task;
        },

        setTaskStatus( task_id: number, status: boolean ) {
            if( this.list ) {
                const index = this.list.tasks.findIndex( task => task.id === task_id );
                this.list.tasks[index].finish = status;
            }
        }
    }
});