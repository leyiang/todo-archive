import type { iTask, iList } from "../types";

export interface iAccessor {
    getTasks() : Promise<iTask[]>;
    addTask( task : iTask ) : Promise<void>;

    getTaskLists() : Promise<iList[]>;
    addTaskList() : Promise<void>;
}
