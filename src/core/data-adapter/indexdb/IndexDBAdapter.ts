import IndexDBAccessor from "./IndexDBAccessor";
import DataOrganizer from "@/core/data-adapter/indexdb/DataOrganizer";
import type {rawFolder, rawStep, rawTask} from "@/core/model/rawTypes";
import {loadRouteLocation} from "vue-router";

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
                    this.accessor.getAll("folder"),
                    this.accessor.getAll("task"),
                    this.accessor.getAll("step"),
                ]).then(([ folders, tasks, steps ]) => {
                    const data = this.organizer.organize( folders, tasks, steps );
                    resolve( data );
                });
            })
        });
    }

    getTasksForTest(): Promise<rawTask[]> {
        return new Promise(resolve => {
            this.accessor.onReady(() => {
                this.accessor.getAll("task").then( tasks => {
                    resolve( tasks );
                });
            })
        })
    }
    getStepsForTest(): Promise<rawStep[]> {
        return new Promise(resolve => {
            this.accessor.onReady(() => {
                this.accessor.getAll("step").then( steps => {
                    resolve( steps );
                });
            })
        })
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

    addTask( name: string, folder_id: number ): Promise<rawTask> {
        return new Promise((resolve, reject) => {
            this.accessor.onReady(() => {
                this.accessor.add("task", {
                    name,
                    folder_id,
                }).then( id => {
                    resolve({
                        id,
                        name,
                        folder_id,
                        important: false,
                        description: "",
                        date: "",
                        finished: false,
                        steps: [],
                    });
                });
            });
        });
    }

    addStep( name: string, task_id: number ): Promise<rawStep> {
        return new Promise((resolve) => {
            this.accessor.onReady(() => {
                this.accessor.add("step", {
                    name,
                    task_id,
                }).then( id => {
                    resolve({
                        id,
                        name,
                        task_id,
                        date: "",
                        finished: false
                    });
                });
            });
        });
    }

    setFolderProp(
        folder_id: number,
        key: string,
        val: any
    ): Promise<void> {
        const allowed_keys = ["name", "order", "filterOptions"];
        if( ! allowed_keys.includes(key) ) {
            throw `Key: ${ key } is not supported in setTaskProp`;
        }

        return new Promise((resolve) => {
            this.accessor.onReady(() => {
                this.accessor.get("folder", folder_id ).then( raw => {
                    raw[ key ] = val;

                    this.accessor.set("folder", raw).then( r => {
                        resolve();
                    });
                });
            });

        });
    }

    setTaskProp(
        task_id: number,
        key: string,
        val: any
    ): Promise<number[]> {
        const allowed_keys = ["name", "description", "finished", "important"];
        if( ! allowed_keys.includes(key) ) {
            throw `Key: ${ key } is not supported in setTaskProp`;
        }

        return new Promise(resolve => {
            this.accessor.onReady(() => {
                this.accessor.get("task", task_id).then( raw => {
                    raw[ key ] = val;

                    this.accessor.set("task", raw).then( r => {
                        resolve([]);
                    });
                });
            });
        });
    }
}