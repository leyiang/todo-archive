import type {iAccessor} from "@/core/accessor/iAccessor";
import LocalStoreManager from "@/core/accessor/store/LocalStorageManager";
import Task from "@/core/model/Task";
import List from "@/core/model/List";

export default class StoreAccessor implements iAccessor {
    tasks: Task[];
    lists: List[];
    manager: LocalStoreManager;

    constructor() {
        this.manager = new LocalStoreManager();

        this.tasks = [];
        this.lists = [];

        /**
         * This Accessor can load data
         * from LocalStorage directly
         */
        this.#load();
    }

    #load() : void {
        const types = ["lists", "tasks"];

        const rawLists = this.manager.get("lists", []);
        const rawTasks = this.manager.get("tasks", []);

        if( Array.isArray( rawLists ) ) this.lists = rawLists.map( List.Load );
        if( Array.isArray( rawTasks ) ) this.tasks = rawTasks.map( Task.Load );
    }

    fetchTasks() : Promise<Task[]> {
        return new Promise((resolve, reject) =>{
            setTimeout(() => {
                resolve( this.tasks );
            }, 2000 )
        });
    }

    /**
     * Return Promise To Be Sync With Other Accessors
     */
    getTasks() : Promise<Task[]> {
        return this.fetchTasks().then(tasks => {
            return tasks;
        })
    }

    addTask(task: Task) : Promise<void> {
        return new Promise((resolve) => {
            resolve();
        });
    }

    getTaskLists() : Promise<List[]> {
        return new Promise(resolve => {
            resolve(this.lists);
        });
    }
}