import IndexDBAccessor from "./IndexDBAccessor";
import DataOrganizer from "@/core/data-adapter/indexdb/DataOrganizer";
import type {rawFolder, rawStep, rawTask} from "@/core/model/rawTypes";
import {isNameEmpty} from "@/shared/utils";
import type {filterOptionsType} from "@/core/model/folder/FilterOptions";
import {loadData} from "@/core/data-adapter/indexdb/IndexDBLoadData";
import type { rawLabel } from "@/core/model/Label";

export default class IndexDBAdapter {
    private accessor: IndexDBAccessor;
    private organizer = new DataOrganizer();
    private folders: rawFolder[] = [];
    private tasks: rawTask[] = [];
    private steps: rawStep[] = [];

    constructor( public test = false ) {
        this.accessor = new IndexDBAccessor("TodoAppNext", 4);
        this.initDatabase();
        // this.factory();
    }

    initDatabase() {
        this.accessor.onInitDatabase((db: IDBDatabase, createStore) => {
            createStore("folder", [
                "name", "order", "filterOptions"
            ]);

            createStore("task", [
                "name", "folder_id", "date", "important", "finished", "description", "priority", "labels"
            ]);

            createStore("step", [
                "name", "task_id", "date", "finished", "priority",
            ]);

            createStore("label", [
                "name", "textColor", "bgColor",
            ]);
        });
    }

    factory() {
        this.accessor.onReady(() => {
            Promise.all([
                this.accessor.clear("folder"),
                this.accessor.clear("task"),
                this.accessor.clear("step"),
            ]).then(() => {
                /**
                 * Contain personal data,
                 * You won't find it in the repository
                 */
                loadData( this.accessor );
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

                    const data = this.organizer.organize( this.folders, tasks, steps );

                    // Data returned should be sorted
                    data.sort( (folder, folder1) => {
                        const folderOrder = Number(folder.order || 10);
                        const folderOrder1 = Number(folder1.order || 10);

                        return folderOrder - folderOrder1;
                    });

                    resolve( data );
                });
            })
        });
    }

    getLabels(): Promise<rawLabel[]> {
        return new Promise(resolve => {
            this.accessor.onReady(() => {
                this.accessor.getAll("label").then( labels => {
                    resolve( labels );
                });
            });
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
        return new Promise((resolve, reject) => {
            if( isNameEmpty(name) ) {
                return reject("folder name should not be empty");
            }

            const filterOptions: filterOptionsType = {};

            // TODO: Just for test, soon remove
            if( name === "Today" ) {
                filterOptions.today = true;
            }

            this.accessor.onReady(() => {
                this.accessor.add("folder", {
                    name,
                    filterOptions,
                }).then( id => {
                    resolve({
                        id,
                        name,
                        order: 10,
                        plans: [],
                        filterOptions,
                    })
                });
            });
        });
    }

    addTask( name: string, folder_id: number ): Promise<rawTask> {
        return new Promise((resolve, reject) => {
            if( isNameEmpty(name) ) {
                return reject("Task name should not be empty");
            }

            let labels:string[] = [];

            if( /:.+[^,] .+/.test(name) ) {
                const spaceIndex = name.indexOf(" ");
                const raw = name.slice(1, spaceIndex);
                name = name.slice(spaceIndex + 1);
                
                labels = raw.split(',');
            }

            this.accessor.onReady(() => {
                this.accessor.add("task", {
                    name,
                    folder_id,
                    labels
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
                        priority: 10,
                        labels,
                    });
                });
            });
        });
    }

    addStep( name: string, task_id: number ): Promise<rawStep> {
        return new Promise((resolve, reject) => {
            if( isNameEmpty(name) ) {
                return reject("Step name should not be empty");
            }

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
                        finished: false,
                        priority: 10
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
            throw `Key: ${ key } is not supported in setFolderProp`;
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
            "name", "description", "finished", "priority"
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


    setStepProp( step_id: number, key: string, val: any ): Promise<number[]> {
        const allowed_keys = ["name", "date", "finished", "priority"];
        if( ! allowed_keys.includes(key) ) {
            throw `Key: ${ key } is not supported in setStepProp`;
        }

        return new Promise((resolve) => {
            this.accessor.onReady(() => {
                this.accessor.get("step", step_id ).then( raw => {
                    raw[ key ] = val;

                    let affecting: number[] = [];

                    this.accessor.set("step", raw).then(() => {
                        if( key === "date" ) {
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

    removeFolder( id: number ): Promise<void> {
        return new Promise((resolve, reject) => {
            this.accessor.onReady(() => {
                this.accessor.remove("folder", id).then(() => {
                    resolve();
                });
            })
        });
    }

    removeTask( id: number ): Promise<void> {
        return new Promise((resolve, reject) => {
            this.accessor.onReady(() => {
                this.accessor.remove("task", id).then(() => {
                    resolve();
                });
            })
        });
    }

    removeStep( id: number ): Promise<void> {
        return new Promise((resolve, reject) => {
            this.accessor.onReady(() => {
                this.accessor.remove("step", id).then(() => {
                    resolve();
                });
            })
        });
    }

    addTaskLabel( task_id: number, label: string ): Promise<void> {
        return new Promise((resolve, reject) => {
            this.accessor.get("task", task_id).then( raw => {
                if( ! Array.isArray(raw.labels) ) {
                    raw.labels = [];
                }

                if( ! raw.labels.includes(label) ) {
                    raw.labels.push(label);
                }

                this.accessor.set("task", raw).then( r => {
                    resolve();
                });
            });
        });
    }

    addLabel( name: string, bgColor: string, textColor: string ): Promise<rawLabel> {
        return new Promise(resolve => {
            this.accessor.onReady(() => {
                this.accessor.add("label", {
                    name,
                    bgColor,
                    textColor
                }).then( id => {
                    resolve({
                        id,
                        name,
                        bgColor,
                        textColor
                    });
                });
            });
        });
    }

    removeLabel( id: number ): Promise<void> {
        return new Promise(resolve => {
            this.accessor.onReady(() => {
                this.accessor.remove("label", id).then(r => {
                    resolve();
                });
            });
        });
    }

    setLabelProps( id: number, attr: {[index: string]: string} ): Promise<void> {
        return new Promise((resolve, reject) => {
            this.accessor.get("label", id ).then( raw => {
                for(let key in attr) {
                    raw[ key ] = attr[key];
                }

                this.accessor.set("label", raw).then( r => {
                    resolve();
                });
            });
        });
    }
}