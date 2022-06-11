import type {iTask} from "@/core/types";

export default class Task implements iTask {
    id: number;
    name: string;
    list_id: number;
    date: Date | null;
    important: boolean;
    finish: boolean;

    constructor(
        id: number,
        name: string,
        list_id: number,
        date: Date | null = null,
        important: boolean = false,
        finish: boolean = false
    ) {
        this.id = id;
        this.name = name;
        this.list_id = list_id;
        this.date = date;
        this.important = important;
        this.finish = finish;
    }

    static Load( task: Task ) : Task {
        return new Task(
            task.id,
            task.name,
            task.list_id,
            task.date,
            task.important,
            task.finish
        );
    }
}