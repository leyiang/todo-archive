import Task from "@/core/model/Task";
import Step from "@/core/model/Step";
import {isRawFolder, isRawStep, isRawTask} from "@/core/model/rawTypes";
import {useTodoStore} from "@/stores/TodoStore";

export default class Folder {
    public plans: (Task | Step)[] = [];

    constructor(
        public id: number,
        public name: string,
        public order = 10,
    ) {
    }

    static Load( raw: any ) {
        if( raw === undefined || raw === null ) {
            throw "Load don't accept undefined or null as parameter";
        }

        if( isRawFolder(raw) ) {
            const folder = new Folder(
                raw.id,
                raw.name,
                raw.order,
            );

            const todoStore = useTodoStore();
            todoStore.folderMap[ raw.id ] = folder;

            raw.plans.forEach( plan => {
                if( isRawTask(plan) ) {
                    if( todoStore.taskMap[plan.id] instanceof Task ) {
                        folder.plans.push( todoStore.taskMap[plan.id] );
                    } else {
                        folder.plans.push( Task.Load(plan) );
                    }
                } else if( isRawStep(plan) ) {
                    if( todoStore.stepMap[plan.id] instanceof Step ) {
                        folder.plans.push( todoStore.stepMap[plan.id] );
                    } else {
                        folder.plans.push( Step.Load(plan) );
                    }
                }
            });

            return folder;
        } else {
            throw "Wrong Properties for Folder.Load";
        }
    }
}