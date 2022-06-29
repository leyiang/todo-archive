import {format} from "@/core/shared/utils";
import type Task from "@/core/model/Task";
import type List from "@/core/model/List";
import type Step from "@/core/model/Step";
import type FilterOptions from "@/core/model/FilterOptions";

export default class ListFiller {
    #tasks: Task[];
    #lists: List[];
    #steps: Step[];
    #specialLists: List[];
    #taskMap: { [key: number]: Task};
    #listMap: { [key: number]: List};

    constructor() {
        this.#tasks = [];
        this.#lists = [];
        this.#specialLists = [];
        this.#steps = [];
        this.#listMap = {};
        this.#taskMap = {};
    }

    set(tasks: Task[], lists: List[], steps: Step[]) {
        this.#tasks = tasks;
        this.#lists = lists;
        this.#steps = steps;

        this.#tasks.forEach( task => {
            this.#taskMap[ task.id ] = task;
        });

        this.#lists.forEach( list => {
            this.#listMap[ list.id ] = list;

            if( list.filterOptions ) {
                this.#specialLists.push( list );
            }
        });
    }

    fill() {
        this.#fillLists();
        this.#fillSpecialLists();

        this.#fillSteps();
    }

    #fillLists() {
        this.#tasks.forEach( task => {
            const list = this.#listMap[ task.list_id ];

            if( list && ! list.filterOptions ) {
                list.tasks.push( task );
            }
        });
    }

    #fillSpecialLists() {
        this.#specialLists.forEach( list => {
            const options = list.filterOptions;

            if( options !== null ) {
                list.tasks = this.#tasks.filter( task => {
                    return this.#checkFilter(task, options);
                });

                list.steps = this.#steps.filter( step => {
                    if( options.equal[0]?.key === "date" ) {
                        return step.date === format("Y-m-d");
                    } else {
                        return false;
                    }
                });
            }
        });
    }

    #checkFilter(task: Task, filterOptions: FilterOptions): boolean {
        /**
         * Dominant Prop filterOptions.all
         * This list will have all tasks
         */
        if( filterOptions.all ) {
            return true;
        }

        /**
         * Check every key inside equal array
         */
        const applyToEqual = filterOptions.equal.every( spec => {
            const key = spec.key;
            const value = spec.value;
            return task[key] === this.parseValue(value);
        });

        /**
         * Task not apply to every equal rule
         */
        if( ! applyToEqual ) return false;

        /**
         * Task need to have every tags inside filterOptions
         */
        const applyToTags = filterOptions.tags.every( tag => {
            return task.tags.includes( tag );
        });

        if( ! applyToTags ) return false;

        return true;
    }

    parseValue( value: string | boolean ) {
        if( value === "__today__" ) {
            const date = new Date();
            return format("Y-m-d");
        }

        return value;
    }

    #fillSteps() {
        this.#steps.forEach( step => {
            const task = this.#taskMap[ step.task_id ];

            if( task ) {
                task.steps.push( step );
            }
        });
    }
}