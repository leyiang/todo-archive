import { defineStore } from 'pinia'
import IndexDBAdapter from "@/core/data-adapter/indexdb/IndexDBAdapter";
import Folder from "@/core/model/folder/Folder";
import type Task from "@/core/model/Task";
import {splice} from "@/shared/utils";
import type Step from "@/core/model/Step";

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

                    // if( this.folders[0].plans[0] ) {
                    //     this.setActiveTask( this.folders[0].plans[0] );
                    // }
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
        },

        removeFolder( folder: Folder ) {
            splice( this.folders, folder );

            /**
             * De-active the removed folder
             */
            if( this.activeFolder === folder ) {
                this.activeFolder = null;
            }
        },

        removeTask( task: Task ) {
            // TODO: What about special folder?

            /**
             * The removing task should be inside activeFolder
             */
            if( this.activeFolder === null ) {
                return;
            }

            splice( this.activeFolder.plans, task );

            /**
             * De-active the removed task
             */
            if( this.activeTask === task ) {
                this.activeTask = null;
            }
        },

        removeStep( step: Step ) {
            /**
             * Step should be inside the active task
             */
            if( this.activeTask === null ) {
                return;
            }

            splice( this.activeTask.steps, step );
        }
    }
});