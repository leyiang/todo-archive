import {defineStore} from 'pinia'
import IndexDBAdapter from "@/core/data-adapter/indexdb/IndexDBAdapter";

export const useTodoStore = defineStore({
    id: "todo",

    state: () => ({
        folders: []
    }),

    actions: {
        init() {
            const adapter = new IndexDBAdapter();
            adapter.loadData();
        }
    }
});