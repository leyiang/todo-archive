import { defineStore } from "pinia";
import type List from "@/core/model/List";
import type Task from "@/core/model/Task";
import accessor from "@/core/accessor/AccessorInstance";
import {splice, triggerDownload} from "@/core/shared/utils";
import type Step from "@/core/model/Step";
import state from "@/core/StatePreserver";
import LocalStoreManager from "@/core/accessor/store/LocalStorageManager";

const manager = new LocalStoreManager();

export const useTodoStore = defineStore("list", {
    state: () => {
        const data : {
            lists: List[],
            specialList: List[],
            list: List | null
            task: Task | null
        } = {
            lists: [],
            specialList: [],
            list: null,
            task: null,
        }

        return data;
    },

    actions: {
        getList() {
            accessor.getTaskLists().then( loaded => {
                this.lists = loaded;
                let index = 0;
                let task_id:number | null = null
                let list_id:number | null = null;

                if( typeof state.get("task") === "number" ) task_id = state.get("task");
                if( typeof state.get("list") === "number" ) list_id = state.get("list");

                if( list_id !== null ) {
                    index = this.lists.findIndex(list => list.id === list_id);
                    index = Math.max(0, index);
                }

                if( index < loaded.length ) {
                    const list = loaded[index];
                    this.setList( loaded[index] );

                    if( task_id !== null ) {
                        index = list.tasks.findIndex(task => task.id === task_id);
                        if( index !== -1 ) {
                            this.toggleTask( list.tasks[index] );
                        }
                    }
                }
            });
        },

        setList( list : List ) {
            /**
             * Need to de-select task detail
             * when change list
             */
            if( this.task ) {
                this.toggleTask( null );
            }

            this.list = list;
            state.save("list", list.id);
        },

        toggleTask( task: Task | null ) {
            /**
             * Even though this three lines
             * is dismissible
             * I choose to leave it here
             * to have a clearer logic
             */
            if( task === null ) {
                return this.task = null;
            }

            if( this.task === task ) {
                this.task = null;
                state.save("task", null);
            } else {
                this.task = task;
                state.save("task", task.id);
            }
        },

        addList( list: List ) {
            this.lists.push( list );
        },

        removeTask( task: Task, list_id_list: number[] = [] ) {
            if( ! list_id_list.includes(task.list_id) ) {
                list_id_list.push( task.list_id );
            }

            list_id_list.forEach( id => {
                const index = this.lists.findIndex( list => list.id === id );
                splice( this.lists[index].tasks, task );
            });
        },

        removeTaskList( list: List ) {
            splice( this.lists, list );
        },

        removeStep( step: Step ) {
            if( this.task ) {
                splice( this.task.steps, step );
            }
        },

        /**
         * This method is used to update special lists
         * we need to get the update detail from backend
         * because we don't know which list will be updated
         * when some property on task is patched.
         * @param task
         * @param list_id_list
         * @param append
         */
        updateSpecialLists( task: Task, list_id_list: number[], append: boolean = true) {
            list_id_list.forEach( id => {
                const index = this.lists.findIndex(list => list.id === id );
                if( append ) {
                    this.lists[index].tasks.push( task );
                } else {
                    splice( this.lists[index].tasks, task );
                }
            });
        },

        exportData() {
            const data = {
                version: "1.0",
                lists: manager.get("lists"),
                tasks: manager.get("tasks"),
                steps: manager.get("steps"),
            };

            triggerDownload( data );
        }
    }
});