import type {iTask} from "@/core/types";

export default class Task implements iTask {
    name : string;

    constructor(name: string) {
        this.name = name;
    }

    static Load( raw : iTask ) : Task {
        return new Task( raw.name );
    }
}