import IndexDBAccessor from "./IndexDBAccessor";
import DataOrganizer from "@/core/data-adapter/indexdb/DataOrganizer";
import type {rawFolder, rawStep, rawTask} from "@/core/model/rawTypes";
import {loadRouteLocation} from "vue-router";

export default class IndexDBAdapter {
    private accessor: IndexDBAccessor;
    private organizer = new DataOrganizer();
    private folders: rawFolder[] = [];
    private tasks: rawTask[] = [];
    private steps: rawStep[] = [];

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
                    this.folders = folders;
                    this.tasks = tasks;
                    this.steps = steps;

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
        const normal_keys = [
            "name", "description", "finished"
        ];

        const special_keys = [
            "important", "folder_id", "date",
        ];

        const allowed_keys = [ ...normal_keys, ...special_keys ];

        if( ! allowed_keys.includes(key) ) {
            throw `Key: ${ key } is not supported in setTaskProp`;
        }

        return new Promise(resolve => {
            this.accessor.onReady(() => {
                this.accessor.get("task", task_id).then( raw => {
                    raw[ key ] = val;

                    let affecting:number[] = [];

                    this.accessor.set("task", raw).then( r => {
                        if( special_keys.includes(key) ) {
                            this.accessor.getAll("folder").then( folders => {
                                affecting = this.getAffecting( folders, key );
                                resolve(affecting);
                            });
                        } else {
                            resolve(affecting);
                        }
                    });
                });
            });
        });
    }

    getAffecting( folders: rawFolder[], key: string ) {
        let affecting = [] as number[];

        folders.forEach( folder => {
            if( ! folder.filterOptions ) return;

            if( key === "date" && folder.filterOptions.today ) {
                affecting.push( folder.id );
            }

            if( key === "important" && folder.filterOptions.important ) {
                affecting.push( folder.id );
            }
        });

        return affecting;
    }
}