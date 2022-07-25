import {isRawStep} from "@/core/model/rawTypes";
import {useTodoStore} from "@/stores/TodoStore";

export default class Step {
    constructor(
        public id: number,
        public task_id: number,
        public name: string,
        public finished: boolean = false,
        public date: string | null = null,
        public priority = 10
    ) {
        
    }

    static Load( raw: any ) {
        if( raw === undefined || raw === null ) {
            throw "Load don't accept undefined or null as parameter";
        }

        if( isRawStep(raw) ) {
            const step = new Step(
                raw.id,
                raw.task_id,
                raw.name,
                raw.finished,
                raw.date,
                raw.priority,
            );

            useTodoStore().stepMap[ raw.id ] = step;

            return step;
        } else {
            throw "Wrong Properties for Folder.Load";
        }
    }
}