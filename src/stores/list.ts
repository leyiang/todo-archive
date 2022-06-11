import { defineStore } from "pinia";
import type List from "@/core/model/List";
import type Task from "@/core/model/Task";

export const useListStore = defineStore("list", {
    state: () => {
        const data : {
            focusing: List | null
        } = {
            focusing: null,
        }

        return data;
    },

    actions: {
        focus( list : List ) {
            this.focusing = list;
        },

        setTaskStatus( task_id: number, status: boolean ) {
            if( this.focusing ) {
                const index = this.focusing.tasks.findIndex( task => task.id === task_id );
                this.focusing.tasks[index].finish = status;
            }
        }
    }
});