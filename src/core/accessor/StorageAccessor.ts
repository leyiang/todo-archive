import type { iTask } from "../types";
import type { iAccessor } from "./iAccessor";

export default class StoreAccessor implements iAccessor {
    getTasks(): iTask[] {
        return [];
    }

    addTask(task: iTask): void {
        console.log( task );
    }
}
