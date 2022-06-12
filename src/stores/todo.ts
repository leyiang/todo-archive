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
    }
});