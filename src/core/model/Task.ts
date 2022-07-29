import Step from "@/core/model/Step";
import {isRawTask} from "@/core/model/rawTypes";
import {useTodoStore} from "@/stores/TodoStore";

export default class Task {
    public steps: Step[] = [];

    constructor(
        public id: number,
        public folder_id: number,
        public name: string,
        public finished: boolean = false,
        public date: string | null = null,
        public description: string,
        public priority = 10,
    ) {
    }

    static Load( raw: any ) {
        if( raw === undefined || raw === null ) {
            throw "Load don't accept undefined or null as parameter";
        }

        if( isRawTask(raw) ) {
            const task = new Task(
                raw.id,
                raw.folder_id,
                raw.name,
                raw.finished,
                raw.date,
                raw.description,
                raw.priority,
            );

            const todoStore = useTodoStore();
            todoStore.taskMap[ raw.id ] = task;

            raw.steps.forEach( step => {
                if( todoStore.stepMap[step.id] instanceof Step ) {
                    task.steps.push( todoStore.stepMap[step.id] );
                } else {
                    task.steps.push( Step.Load(step) );
                }
            });

            return task;
        } else {
            throw "Wrong Properties for Folder.Load";
        }
    }
}