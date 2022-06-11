import type { iTask, iList } from "../types";
import type Step from "@/core/model/Step";

export interface iAccessor {
    getTasks() : Promise<iTask[]>;
    addTask( name: string, list_id: number ) : Promise<iTask>;

    getTaskLists() : Promise<iList[]>;
    addTaskList( name: string, icon: string | null ) : Promise<iList>;

    setTaskFinishStatus( task_id: number, type: boolean ): Promise<void>;

    addStep( name: string, task_id: number ) : Promise<Step>;
}