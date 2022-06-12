import type { iTask, iList } from "../types";
import type Step from "@/core/model/Step";

export interface iAccessor {
    getTasks() : Promise<iTask[]>;
    addTask( name: string, list_id: number ) : Promise<iTask>;
    setTaskFinishStatus( task_id: number, type: boolean ): Promise<void>;
    removeTask( task_id: number ): Promise<void>;

    getTaskLists() : Promise<iList[]>;
    addTaskList( name: string, icon: string | null ) : Promise<iList>;
    removeTaskList( list_id: number ): Promise<void>;

    addStep( name: string, task_id: number ) : Promise<Step>;
    setStepStatus( step_id: number, type: boolean ) : Promise<void>;
    removeStep( step_id: number ): Promise<void>;
}