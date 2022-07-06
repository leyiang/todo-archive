import {isRawStep} from "@/core/model/rawTypes";

export default class Step {
    constructor(
        public id: number,
        public name: string,
        public finished: boolean = false,
        public date: string | null = null,
    ) {
        
    }

    static Load( raw: any ) {
        if( raw === undefined || raw === null ) {
            throw "Load don't accept undefined or null as parameter";
        }

        if( isRawStep(raw) ) {
            return new Step(
                raw.id,
                raw.name,
                raw.finished,
                raw.date,
            );
        } else {
            throw "Wrong Properties for Folder.Load";
        }
    }
}