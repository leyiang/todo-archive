import type {iAccessor} from "@/core/accessor/iAccessor";
import LocalStoreManager from "@/core/accessor/store/LocalStorageManager";
import Task from "@/core/model/Task";
import List from "@/core/model/List";
import Step from "@/core/model/Step";
import ListFiller from "@/core/accessor/store/ListFiller";
import IndexDBAdapter from "@/core/accessor/store/IndexDBAdapter";
import {triggerDownload} from "@/core/shared/utils";

class StoreAccessor implements iAccessor {
    #tasks: Task[];
    #lists: List[];
    #steps: Step[];
    #manager: LocalStoreManager;
    #adapter: IndexDBAdapter;
    filler: ListFiller;

    constructor() {
        this.filler = new ListFiller();
        this.#manager = new LocalStoreManager();
        this.#adapter = new IndexDBAdapter("TodoDatabase", 2);

        this.#tasks = [];
        this.#lists = [];
        this.#steps = [];

        /**
         * This Accessor can load data
         * from LocalStorage directly
         */
        this.#load();
    }

    #load(): void {
        this.#initDB();

        /**
         * Hook for db connected
         */
        this.#adapter.connected(() => {
            // this.#factory();
        });
    }

    #initDB() {
        this.#adapter.init((db: IDBDatabase) => {
            if (!db.objectStoreNames.contains("list")) {
                const store = db.createObjectStore("list", {autoIncrement: true, keyPath: 'id'})

                store.createIndex("name", "name", {unique: false});
                store.createIndex("icon", "icon", {unique: false});
                store.createIndex("filterOptions", "filterOptions", {unique: false});
                store.createIndex("settings", "settings", {unique: false});
                store.createIndex("sort", "sort", {unique: false});
            }

            if (!db.objectStoreNames.contains("task")) {
                const store = db.createObjectStore("task", {autoIncrement: true, keyPath: 'id'})

                store.createIndex("sort", "sort", {unique: false});
                store.createIndex("name", "name", {unique: false});
                store.createIndex("list_id", "list_id", {unique: false});
                store.createIndex("date", "date", {unique: false});
                store.createIndex("important", "important", {unique: false});
                store.createIndex("finish", "finish", {unique: false});
                store.createIndex("tags", "tags", {unique: false});
                store.createIndex("notes", "notes", {unique: false});
                store.createIndex("due_date", "due_date", {unique: false});
            }

            if (!db.objectStoreNames.contains("step")) {
                const store = db.createObjectStore("step", {autoIncrement: true, keyPath: 'id'})

                store.createIndex("name", "name", {unique: false});
                store.createIndex("task_id", "task_id", {unique: false});
                store.createIndex("finish", "finish", {unique: false});
                store.createIndex("sort", "sort", {unique: false});
            }
        });
    }

    #factory() {
        const data = {};

        this.#adapter.clear("list");
        this.#adapter.clear("task");
        this.#adapter.clear("step");

        // data.lists.forEach( list => {
        //     this.#adapter.addItem("list", list);
        // });
        //
        // data.tasks.forEach( task => {
        //     this.#adapter.addItem("task", task);
        // });
        //
        // data.steps.forEach( step => {
        //     this.#adapter.addItem("step", step);
        // });
    }

    fetchTasks(): Promise<Task[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.#tasks);
            }, 2000)
        });
    }

    parseTaskName(name: string) {
        let tags: string[] = [];

        /**
         * :book Book Name Here
         */
        if (name[0] === ":") {
            const firstSpaceIndex = name.indexOf(" ");
            const rawTag = name.slice(1, firstSpaceIndex);
            tags = rawTag.split(",");
            name = name.slice(firstSpaceIndex + 1);
        }

        return {
            name,
            tags
        }
    }

    addTask(name: string, list_id: number): Promise<Task> {
        const list: List | undefined = this.#lists.find(list => list.id === list_id );
        const info = this.parseTaskName(name);

        return new Promise((resolve) => {
            const task = new Task(0, info.name, list_id);

            const value = task.toObject();
            value.tags = info.tags;
            delete value["id"];

            /**
             * Say, if you want to insert in - Today list
             * This block of code will set it for you.
             */
            if( list !== undefined && list.filterOptions ) {
                list.filterOptions?.equal.forEach(item => {
                    const val = this.filler.parseValue( item.value );
                    value[ item.key ] = val;
                });
            }

            this.#adapter.connected(() => {
                this.#adapter.addItem("task", value).then(id => {
                    resolve( Task.Load(value) );
                });
            });
        });
    }

    updateTaskProp(task_id: number, key: string, val: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.#adapter.connected(() => {
                const allowed_keys = ["name", "notes", "sort"];

                if( allowed_keys.includes(key) ) {
                    this.#adapter.update("task", task_id, key, val ).then( r => {
                        resolve();
                    });
                } else {
                    reject("Wrong Key");
                }
            });
        });
    }

    getTaskLists(): Promise<List[]> {
        return new Promise(resolve => {
            /**
             * Resolve Clone Version Array
             * To Prevent Local-Array-Reference Problems
             */
            this.#adapter.connected(() => {
                Promise.all([
                    this.#adapter.getAll("list"),
                    this.#adapter.getAll("task"),
                    this.#adapter.getAll("step"),
                ]).then(([
                     lists,
                     tasks,
                     steps
                ]) => {
                    lists = lists.map(List.Load);
                    tasks = tasks.map(Task.Load);
                    steps = steps.map(Step.Load);

                    this.filler.set(tasks, lists, steps);
                    this.filler.fill();

                    this.#tasks = tasks;
                    this.#lists = lists;
                    this.#steps = steps;

                    resolve(lists.slice());
                });
            });
        });
    }

    addTaskList(
        name: string,
        icon: string | null = null,
        filterOptions: {} | null = null,
    ): Promise<List> {
        return new Promise(resolve => {

            const list = new List(0, name, icon, filterOptions);
            //@ts-ignore
            delete list["id"];

            this.#adapter.connected(() => {
                this.#adapter.addItem("list", list).then(id => {
                    list.id = id;

                    this.#lists.push(list);
                    resolve(list);
                });
            });
        });
    }

    removeTask(task_id: number): Promise<number[]> {
        return new Promise(resolve => {
            this.#adapter.connected(() => {
                this.#adapter.remove( "task", task_id );

                const list_id_list = this.#lists
                    .filter(list => list.tasks.map(task => task.id).includes(task_id))
                    .map(list => list.id);

                resolve(list_id_list);
            });
        });
    }

    removeTaskList(list_id: number): Promise<void> {
        return new Promise(resolve => {
            resolve();
            this.#adapter.connected(() => {
                this.#adapter.remove("list", list_id);
                resolve();
            });
        });
    }

    updateTaskListProp(list_id: number, key: string, val: any): Promise<void> {
        return new Promise(resolve => {
            this.#adapter.connected(() => {
                this.#adapter.update("list", list_id, key, val).then( r => {
                    resolve();
                });
            });
        });
    }

    addStep(name: string, task_id: number): Promise<Step> {
        return new Promise(resolve => {
            this.#adapter.connected(() => {
                const step = new Step(0, name, task_id);
                //@ts-ignore
                delete step["id"];

                this.#adapter.addItem("step", step).then(id => {
                    step.id = id;
                    this.#steps.push(step);
                    resolve(step);
                });
            });
        });
    }

    setStepStatus(step_id: number, type: boolean): Promise<void> {
        return new Promise((resolve, reject) => {
            this.#adapter.connected(() => {
                const step = this.#steps.find( step => step.id === step_id );

                this.#adapter.update("step", step_id, "finish", type).then( r => {
                    resolve();
                });
            });
        });
    }

    removeStep(step_id: number): Promise<void> {
        return new Promise(resolve => {
            this.#adapter.connected(() => {
                this.#adapter.remove("step", step_id).then( r => {
                    resolve();
                });
            });
        });
    }

    setTaskSpecialProp(task_id:number, key: string, val: boolean | string | Date): Promise<number[]> {
        return new Promise((resolve, reject) => {
            switch( key ) {
                case "important" :
                    if( typeof val !== "boolean" ) {
                        reject( new TypeError() );
                    }
                    break;

                case "finish":
                    if( typeof val !== "boolean" ) {
                        reject( new TypeError() );
                    }
                    break;

                case "date":
                    if( typeof val !== "string" ) {
                        reject( new TypeError() );
                    }
                    break;

                default:
                    reject( new Error("Key is not allowed") );
                    break;
            }

            this.#adapter.connected(() => {
                this.#adapter.update("task", task_id, key, val).then(() => {
                    const list_id_list = this.#lists
                        .filter(list => {
                            const equals = list.filterOptions
                                ? list.filterOptions.equal.map(item => item.key)
                                : [];

                            return equals.includes( key );
                        })
                        .map(list => list.id)

                    resolve(list_id_list);
                });
            })
        });
    }

    updateStepProp(step_id: number, key: string, val: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.#adapter.connected(() => {
                const allowed_keys = ["name"];

                if( allowed_keys.includes(key) ) {
                    this.#adapter.update("step", step_id, key, val).then(r => {
                        resolve();
                    });
                } else {
                    reject("Key is not allowed");
                }
            })
        });
    }

    /**
     * We don't get tasks directly in the app
     * But we need to test the feature in the smallest range
     * So add this func for test purpose
     */
    getTasksForTest(): Promise<Task[]> {
        return new Promise(resolve => {
            this.#adapter.connected(() => {
                this.#adapter.getAll("task").then( tasks => {
                    resolve( tasks );
                });
            });
        });
    }

    /**
     * We don't get tasks directly in the app
     * But we need to test the feature in the smallest range
     * So add this func for test purpose
     */
    getStepsForTest(): Promise<Step[]> {
        return new Promise(resolve => {
            this.#adapter.connected(() => {
                this.#adapter.getAll("step").then( steps => {
                    resolve( steps );
                });
            });
        });
    }


    /**
     * This method is to delete all tasks
     * that have task_list_id, but cannot find task_list
     * Which is caused by dev tests
     */
    devRemoveAllTaskWithoutTaskList() {
        this.#tasks.forEach( task => {
            const list = this.#lists.findIndex( list => list.id === task.list_id );

            if( list === -1 ) {
                this.removeTask( task.id );
            }
        });
    }
}

export default StoreAccessor;
