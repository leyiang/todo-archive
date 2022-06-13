import Step from "@/core/model/Step";

export default class Task {
    id: number;
    name: string;
    list_id: number;
    date: string | null;
    important: boolean;
    finish: boolean;
    steps: Step[];

    constructor(
        id: number,
        name: string,
        list_id: number,
        date: string | null = null,
        important: boolean = false,
        finish: boolean = false,
        steps: Step[] = [],
    ) {
        this.id = id;
        this.name = name;
        this.list_id = list_id;
        this.date = date;
        this.important = important;
        this.finish = finish;
        this.steps = steps;
    }

    static Load( task: Task ) : Task {
        return new Task(
            task.id,
            task.name,
            task.list_id,
            task.date,
            task.important,
            task.finish,
        );
    }
}