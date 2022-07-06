import { defineStore } from 'pinia'
import IndexDBAdapter from "@/core/data-adapter/indexdb/IndexDBAdapter";
import Folder from "@/core/model/folder/Folder";

export const adapter = new IndexDBAdapter();
export const useTodoStore = defineStore({
    id: "todo",

    state: () => ({
        folders: [] as Folder[],
        activeFolder: null as (null | Folder)
    }),

    actions: {
        init() {
            adapter.loadData().then( folders => {
                this.folders = folders.map( folder => Folder.Load(folder) );
            });
        },

        setActiveFolder( folder: Folder ) {
            this.activeFolder = folder;
        },

        addFolder( folder: Folder ) {
            this.folders.push( folder );
        }
    }
});