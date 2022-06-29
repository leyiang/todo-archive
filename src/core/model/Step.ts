export default class Step {
    id: number;
    name: string;
    task_id: number;
    finish: boolean;
    sort: number;
    date: string | null;

    constructor(
        id: number,
        name: string,
        task_id: number,
        finish: boolean = false,
        sort: number = 0,
        date: string | null = null,
    ) {
        this.id = id;
        this.name = name;
        this.task_id = task_id;
        this.finish = finish;
        this.sort = sort;
        this.date = date;
    }

    static Load( step: Step ) : Step {
        return new Step(
            step.id,
            step.name,
            step.task_id,
            step.finish,
            step.sort,
            step.date
        );
    }

    toObject() {
        return JSON.parse(
            JSON.stringify( this )
        );
    }
}