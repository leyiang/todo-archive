import type Step from "@/core/model/Step";

export default class Task {
    id: number;
    name: string;
    list_id: number;
    date: string | null;
    important: boolean;
    finish: boolean;
    steps: Step[];
    tags: string[];
    notes: string;
    due_date: null | Date;
    sort: number;
    [index: string]: any;

    constructor(
        id: number,
        name: string,
        list_id: number,
        date: string | null = null,
        important: boolean = false,
        finish: boolean = false,
        notes: string = "",
        tags: string[] = [],
        due_date: null | Date = null,
        sort:number = 10,
        steps: Step[] = [],
    ) {
        this.id = id;
        this.name = name;
        this.list_id = list_id;
        this.date = date;
        this.important = important;
        this.finish = finish;
        this.notes = notes;
        this.tags = tags;
        this.steps = steps;
        this.due_date = due_date;
        this.sort = sort;
    }

    static Load( task: Task ) : Task {
        const due_date = task.due_date
            ? new Date( task.due_date )
            : null;

        return new Task(
            task.id,
            task.name,
            task.list_id,
            task.date,
            task.important,
            task.finish,
            task.notes,
            task.tags,
            due_date,
            task.sort
        );
    }

    toObject() {
        return JSON.parse(
            JSON.stringify( this )
        );
    }
}
