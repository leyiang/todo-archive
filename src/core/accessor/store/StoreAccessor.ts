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

    #save() : void {
        this.manager.set("lists", this.lists);
        this.manager.set("tasks", this.tasks);
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
            /**
             * Resolve Clone Version Array
             * To Prevent Local-Array-Reference Problems
             */
            const lists = this.lists.slice();
            resolve( lists );
        });
    }

    addTaskList( name: string, icon: string | null = null ): Promise<List> {
        return new Promise(resolve => {
            const id = this.lists.length;
            const list = new List(id, name, icon);
            this.lists.push( list );
            this.#save();

            resolve( list );
        });
    }
}