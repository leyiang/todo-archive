import IndexDBAccessor from "./IndexDBAccessor";
import DataOrganizer from "@/core/data-adapter/indexdb/DataOrganizer";
import type {rawFolder, rawStep} from "@/core/model/rawTypes";

export default class IndexDBAdapter {
    private accessor: IndexDBAccessor;
    private organizer = new DataOrganizer();

    constructor() {
        this.accessor = new IndexDBAccessor("TodoApp", 1);
        this.initDatabase();
        // this.factory();
    }

    initDatabase() {
        this.accessor.onInitDatabase((db: IDBDatabase, createStore) => {
            createStore("folder", [
                "name", "order", "filterOptions"
            ]);

            createStore("task", [
                "name", "folder_id", "date", "important", "finished", "description"
            ]);

            createStore("step", [
                "name", "task_id", "date", "finished",
            ]);
        });
    }

    factory() {
        this.accessor.onReady(() => {
            Promise.all([
                this.accessor.clear("folder")
            ]).then(() => {
                this.accessor.add("folder", {
                    name: "folder 1",
                });
            });
        });
    }

    loadData(): Promise<rawFolder[]> {
        return new Promise(resolve => {
            this.accessor.onReady(() => {
                Promise.all([
                    this.accessor.get("folder"),
                    this.accessor.get("task"),
                    this.accessor.get("step"),
                ]).then(([ folders, tasks, steps ]) => {
                    const data = this.organizer.organize( folders, tasks, steps );
                    resolve( data );
                });
            })
        });
    }

    addFolder( name: string ): Promise<rawFolder> {
        return new Promise((resolve) => {
            this.accessor.onReady(() => {
                this.accessor.add("folder", {
                    name
                }).then( id => {
                    resolve({
                        id,
                        name,
                        order: 10,
                        plans: []
                    })
                });
            });
        });
    }
}