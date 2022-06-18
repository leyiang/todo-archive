export default class Step {
    id: number;
    name: string;
    task_id: number;
    finish: boolean;
    sort: number;

    constructor(
        id: number,
        name: string,
        task_id: number,
        finish: boolean = false,
        sort: number = 0,
    ) {
        this.id = id;
        this.name = name;
        this.task_id = task_id;
        this.finish = finish;
        this.sort = sort;
    }

    static Load( step: Step ) : Step {
        return new Step(
            step.id,
            step.name,
            step.task_id,
            step.finish,
            step.sort
        );
    }

    toObject() {
        return JSON.parse(
            JSON.stringify( this )
        );
    }
}