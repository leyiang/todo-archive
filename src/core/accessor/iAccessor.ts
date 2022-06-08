import type { iTask } from "../types";

export interface iAccessor {
    getTasks() : Array<iTask>;
    addTask( task : iTask ) : void;
}
