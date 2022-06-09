import type { iTask, iList } from "../types";

export interface iAccessor {
    getTasks() : Promise<iTask[]>;
    addTask( name: string, list_id: number ) : Promise<iTask>;

    getTaskLists() : Promise<iList[]>;
    addTaskList( name: string, icon: string | null ) : Promise<iList>;
}