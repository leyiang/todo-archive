import type Step from "@/core/model/Step";

export default class Task {
    public steps: Step[] = [];

    constructor(
        public id: number,
        public name: string,
        public finished: boolean = false,
        public date: Date | null = null,
        public description: string,
    ) {
    }

    static isFolderParameters( obj: {} ) : obj is Task {
        const requiredKeys = [ "id", "name" ];

        for(let key of requiredKeys) {
            if( ! obj.hasOwnProperty(key) ) {
                return false;
            }
        }

        return true;
    }

    static Load( raw: {} ) {
        if( raw === undefined || raw === null ) {
            throw "Load don't accept undefined or null as parameter";
        }

        if( Task.isFolderParameters(raw) ) {
            return new Task(
                raw.id,
                raw.name,
                raw.finished,
                raw.date,
                raw.description
            );
        } else {
            throw "Wrong Properties for Folder.Load";
        }
    }
}