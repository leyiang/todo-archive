import Task from "@/core/model/Task";
import Step from "@/core/model/Step";
import {isRawFolder, isRawStep, isRawTask} from "@/core/model/rawTypes";

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

            raw.plans.forEach( plan => {
                if( isRawTask(plan) ) {
                    folder.plans.push( Task.Load(plan) );
                } else if( isRawStep(plan) ) {
                    folder.plans.push( Step.Load(plan) );
                }
            });

            return folder;
        } else {
            throw "Wrong Properties for Folder.Load";
        }
    }
}