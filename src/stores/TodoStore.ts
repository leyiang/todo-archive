import { defineStore } from 'pinia'
import IndexDBAdapter from "@/core/data-adapter/indexdb/IndexDBAdapter";
import Folder from "@/core/model/folder/Folder";
import type Task from "@/core/model/Task";

export const adapter = new IndexDBAdapter();
export const useTodoStore = defineStore({
    id: "todo",

    state: () => ({
        folders: [] as Folder[],
        activeFolder: null as (null | Folder),
        activeTask: null as (null | Task),
    }),

    actions: {
        init() {
            adapter.loadData().then( folders => {
                this.folders = folders.map( folder => Folder.Load(folder) );

                if( this.folders[0] !== undefined ) {
                    this.setActiveFolder( this.folders[0] );

                    if( this.folders[0].plans[0] ) {
                        this.setActiveTask( this.folders[0].plans[0] );
                    }
                }
            });
        },

        setActiveFolder( folder: Folder ) {
            this.activeFolder = folder;
        },

        setActiveTask( task: Task ) {
            this.activeTask = task;
        },

        addFolder( folder: Folder ) {
            this.folders.push( folder );
        }
    }
});