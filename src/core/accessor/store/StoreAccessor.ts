import type {iAccessor} from "@/core/accessor/iAccessor";
import LocalStoreManager from "@/core/accessor/store/LocalStorageManager";
import Task from "@/core/model/Task";
import List from "@/core/model/List";
import Step from "@/core/model/Step";
import {format, last} from "@/core/shared/utils";
import accessor from "@/core/accessor/AccessorInstance";
import ListFiller from "@/core/accessor/store/ListFiller";

export default class StoreAccessor implements iAccessor {
    #tasks: Task[];
    #lists: List[];
    #steps: Step[];
    #manager: LocalStoreManager;
    filler: ListFiller;

    constructor() {
        this.filler = new ListFiller();
        this.#manager = new LocalStoreManager();

        this.#tasks = [];
        this.#lists = [];
        this.#steps = [];

        /**
         * This Accessor can load data
         * from LocalStorage directly
         */
        this.#load();
    }

    #load() : void {
        const listMap : any = {};
        const taskMap : any = {};

        const rawLists = this.#manager.get("lists", []);
        const rawTasks = this.#manager.get("tasks", []);
        const rawSteps = this.#manager.get("steps", []);

        if( Array.isArray( rawLists ) ) this.#lists = rawLists.map( List.Load );
        if( Array.isArray(rawTasks) ) this.#tasks = rawTasks.map( Task.Load );
        if( Array.isArray(rawSteps) ) this.#steps = rawSteps.map(Step.Load);

        this.filler.set( this.#tasks, this.#lists, this.#steps );
        this.filler.fill();
    }

    #save() : void {
        this.#manager.set("lists", this.#lists);
        this.#manager.set("tasks", this.#tasks);
        this.#manager.set("steps", this.#steps);
    }

    fetchTasks() : Promise<Task[]> {
        return new Promise((resolve, reject) =>{
            setTimeout(() => {
                resolve( this.#tasks );
            }, 2000 )
        });
    }

    /**
     * Return Promise To Be Sync With Other Accessors
     */
    getTasks() : Promise<Task[]> {
        return this.fetchTasks().then(tasks => {
            return tasks;
        });
    }

    addTask( name: string, list_id: number ) : Promise<Task> {
        return new Promise((resolve) => {
            let id = this.#tasks.length;

            /**
             * Assume last element in array
             * has the biggest id
             */
            if( this.#tasks.length !== 0 ) {
                id = last( this.#tasks ).id + 1;
            }

            const task = new Task( id, name, list_id );
            this.#tasks.push( task );
            this.#save();
            resolve( task );
        });
    }

    updateTaskProp(task_id: number, key: string, val: any): Promise<void> {
        return new Promise(resolve => {
            const index = this.#tasks.findIndex(task => task.id === task_id);

            if( key === "name" ) {
                this.#tasks[ index ].name = val;
            }

            this.#save();
            resolve();
        });
    }

    getTaskLists() : Promise<List[]> {
        return new Promise(resolve => {
            /**
             * Resolve Clone Version Array
             * To Prevent Local-Array-Reference Problems
             */
            const lists = this.#lists.slice();

            resolve( lists );
        });
    }

    addTaskList(
        name: string,
        icon: string | null = null,
        isDefault=false,
        filterOptions: {} | null = null,
    ): Promise<List> {
        return new Promise(resolve => {
            let id = this.#lists.length;

            if( this.#lists.length !== 0 ) {
                id = last( this.#lists ).id + 1;
            }

            const list = new List(id, name, icon, isDefault, filterOptions);
            this.#lists.push( list );
            this.#save();

            resolve( list );
        });
    }

    setTaskFinishStatus( task_id: number, type: boolean ): Promise<void> {
        return new Promise(resolve => {
            const index = this.#tasks.findIndex(task => task.id === task_id);
            this.#tasks[ index ].finish = type;
            this.#save();
            resolve();
        });
    }

    setTaskImportantStatus(task_id: number, status: boolean): Promise<number[]> {
        return new Promise(resolve => {
            const index = this.#tasks.findIndex(task => task.id === task_id);
            this.#tasks[ index ].important = status;
            this.#save();

            const list_id_list = this.#lists
                .filter(list => list.filterOptions?.equal )
                .filter(list => list.filterOptions && list.filterOptions.equal.map(item => item.key).includes('important') )
                .filter(list => ! list.tasks.map(task => task.id).includes(task_id) )
                .map(list => list.id)

            resolve(list_id_list);
        });
    }

    setTaskNotes(task_id: number, notes: string): Promise<void> {
        return new Promise(resolve => {
            const index = this.#tasks.findIndex(task => task.id === task_id);
            this.#tasks[ index ].notes = notes;
            this.#save();

            resolve();
        });
    }

    removeTask(task_id: number): Promise<number[]> {
        return new Promise(resolve => {
            const index = this.#tasks.findIndex(task => task.id === task_id );
            this.#tasks.splice( index, 1 );
            this.#save();

            const list_id_list = this.#lists
                .filter(list => list.tasks.map(task => task.id).includes(task_id) )
                .map(list => list.id);

            resolve( list_id_list );
        });
    }

    removeTaskList(list_id: number): Promise<void> {
        return new Promise(resolve => {
            const index = this.#lists.findIndex(list => list.id === list_id);
            this.#lists.splice( index, 1 );
            this.#save();
            resolve();
        });
    }

    updateTaskListProp(list_id: number, key: string, val: any): Promise<void> {
        return new Promise(resolve => {
            const index = this.#lists.findIndex(list => list.id === list_id);
            const list = this.#lists[ index ];

            // @ts-ignore
            list[ key ] = val;

            this.#save();
            resolve();
        });
    }

    addStep( name: string, task_id: number ) : Promise<Step> {
        return new Promise(resolve => {
            let id = this.#steps.length;

            if( this.#steps.length !== 0 ) {
                id = last( this.#steps ).id + 1;
            }

            const step = new Step(id, name, task_id);
            this.#steps.push( step );
            this.#save();
            resolve( step );
        });
    }

    setStepStatus(step_id: number, type: boolean): Promise<void> {
        return new Promise(resolve => {
            const index = this.#steps.findIndex(step => step.id === step_id);
            this.#steps[ index ].finish = type;
            this.#save();
            resolve();
        });
    }

    removeStep(step_id: number): Promise<void> {
        return new Promise(resolve => {
            const index = this.#steps.findIndex(step => step.id === step_id);
            this.#steps.splice( index, 1 );
            this.#save();
            resolve();
        });
    }


    factory() {
        this.#lists = [];

        accessor.addTaskList("My Day", "ic:outline-wb-sunny", true, {
            equal: [
                {
                    key: "date",
                    value: "__today__"
                }
            ]
        });

        accessor.addTaskList("Important", "ic:round-star-border", true, {
            equal: [
                {
                    key: "important",
                    value: true
                }
            ]
        });

        accessor.addTaskList("All", "ic:baseline-list-alt", true, {
            all: true
        });
    }

    setTaskToday( task_id: number ): Promise<number[]> {
        return new Promise(resolve => {
            const index = this.#tasks.findIndex(task => task.id === task_id);
            this.#tasks[ index ].date = format("Y-m-d");
            this.#save();

            const list_id_list = this.#lists
                .filter(list => list.filterOptions?.equal )
                .filter(list => list.filterOptions && list.filterOptions.equal.map(item => item.key).includes('date') )
                .filter(list => ! list.tasks.map(task => task.id).includes(task_id) )
                .map(list => list.id)

            resolve(list_id_list);
        });
    }

    updateStepProp(step_id: number, key: string, val: any): Promise<void> {
        return new Promise(resolve => {
            const index = this.#steps.findIndex(step => step.id === step_id);

            if( key === "name" ) {
                this.#steps[index].name = val;
            }

            this.#save();
            resolve();
        });
    }
}