import type Step from "@/core/model/Step";
import type Task from "@/core/model/Task";
import type List from "@/core/model/List";

export interface iAccessor {
    getTasks() : Promise<Task[]>;
    addTask( name: string, list_id: number ) : Promise<Task>;
    setTaskFinishStatus( task_id: number, type: boolean ): Promise<void>;
    setTaskImportantStatus( task_id: number, status: boolean ): Promise<number[]>;
    setTaskNotes( task_id: number, notes: string ): Promise<void>;
    removeTask( task_id: number ): Promise<number[]>;
    setTaskToday( task_id:number ): Promise<number[]>
    updateTaskProp( task_id:number, key: string, val: any ): Promise<void>;

    getTaskLists() : Promise<List[]>;
    addTaskList( name: string, icon: string | null ) : Promise<List>;
    removeTaskList( list_id: number ): Promise<void>;
    updateTaskListProp( list_id:number, key:string, val: any ): Promise<void>;

    addStep( name: string, task_id: number ) : Promise<Step>;
    setStepStatus( step_id: number, type: boolean ) : Promise<void>;
    removeStep( step_id: number ): Promise<void>;
    updateStepProp( step_id:number, key:string, val:any): Promise<void>;
}