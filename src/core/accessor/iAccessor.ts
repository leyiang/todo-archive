import type { iTask, iList } from "../types";

export interface iAccessor {
    getTasks() : Promise<iTask[]>;
    addTask( task : iTask ) : Promise<void>;

    getTaskLists() : Promise<iList[]>;
    addTaskList( name: string, icon: string | null ) : Promise<iList>;
}