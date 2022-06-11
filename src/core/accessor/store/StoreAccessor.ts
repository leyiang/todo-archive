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
        const listMap : any = {};

        const rawLists = this.manager.get("lists", []);
        const rawTasks = this.manager.get("tasks", []);

        if( Array.isArray( rawLists ) ) {
            const lists : List[] = [];

            rawLists.forEach( raw => {
                const list = List.Load(raw);
                listMap[ list.id ] = list;
                lists.push( list );
            });

            this.lists = lists;
        }

        if( Array.isArray( rawTasks ) ) this.tasks = rawTasks.map( Task.Load );

        this.tasks.forEach( task => {
            const list = listMap[ task.list_id ];
            if( list ) {
                list.tasks.push( task );
            }
        });
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

    addTask( name: string, list_id: number ) : Promise<Task> {
        return new Promise((resolve) => {
            const id = this.tasks.length;
            const task = new Task( id, name, list_id );
            this.tasks.push( task );
            this.#save();
            resolve( task );
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

    addTaskList( name: string, icon: string | null = null, isDefault=false): Promise<List> {
        return new Promise(resolve => {
            const id = this.lists.length;
            const list = new List(id, name, icon, isDefault);
            this.lists.push( list );
            this.#save();

            resolve( list );
        });
    }

    setTaskFinishStatus( task_id: number, type: boolean ): Promise<void> {
        return new Promise(resolve => {
            const index = this.tasks.findIndex(task => task.id === task_id);
            this.tasks[ index ].finish = type;
            this.#save();
            resolve();
        });
    }
}