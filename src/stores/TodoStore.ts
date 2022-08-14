import { defineStore } from 'pinia'
import IndexDBAdapter from "@/core/data-adapter/indexdb/IndexDBAdapter";
import Folder from "@/core/model/folder/Folder";
import Task from "@/core/model/Task";
import {splice} from "@/shared/utils";
import type Step from "@/core/model/Step";
import Label, {type rawLabel} from '@/core/model/Label';

export const adapter = new IndexDBAdapter();
export const useTodoStore = defineStore({
    id: "todo",

    state: () => ({
        folderMap: {} as { [id: number]: Folder},
        taskMap: {} as { [id: number]: Task},
        stepMap: {} as { [id: number]: Step},

        folders: [] as Folder[],
        activeFolder: null as (null | Folder),
        settingFolder: null as (null | Folder),
        activeTask: null as (null | Task),

        labels: [] as Label[],
        labelMap: {} as { [id: string]: Label },

        editingLabelTask: null as (null | Task),
    }),

    actions: {
        init() {
            const raw_folder_id = Number( localStorage.getItem("active_folder_id") );
            const raw_task_id = Number( localStorage.getItem("active_task_id") );

            adapter.loadData().then( folders => {
                this.folders = folders.map( folder => Folder.Load(folder) );

                if( this.folderMap[ raw_folder_id ] !== undefined ) {
                    this.setActiveFolder( this.folderMap[ raw_folder_id ] );
                    this.setActiveTask( this.taskMap[ raw_task_id ] );
                } else {
                    this.setActiveFolder( this.folders[0] );
                }
            });

            adapter.getLabels().then( labels => {
                labels.map( raw => {
                    this.addLabel( raw );
                });
            });
        },

        addLabel( raw: rawLabel ) {
            const label = Label.Load(raw);
            this.labelMap[ label.name ] = label;
            this.labels.push( label );
        },

        removeLabel( label: Label ) {
            splice(this.labels, label);
            delete this.labelMap[ label.name ];
        },

        setActiveFolder( folder?: Folder ) {
            if( folder !== undefined ) {
                this.activeFolder = folder;
                localStorage.setItem("active_folder_id", folder.id.toString() );
            }
        },

        setActiveTask( task?: Task | null ) {
            if( task instanceof Task ) {
                this.activeTask = task;
                localStorage.setItem("active_task_id", task.id.toString() );
            } else {
                this.activeTask = null;
                localStorage.removeItem("active_task_id");
            }
        },

        toggleTaskActive( task: Task ) {
            if( this.activeTask === task ) {
                this.setActiveTask( null );
            } else {
                this.setActiveTask( task );
            }
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

                /**
                 * Should also de-active the task
                 */
                this.activeTask = null;
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
                this.setActiveTask( null );
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
        },

        exportData() {
            const data = {
                version: "2.0",
                folders: this.folders
            };


            const raw = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify( data ));

            const a = document.createElement("a");
            a.setAttribute("href", raw );
            a.setAttribute("download", "export.json");

            a.click();
        }
    }
});