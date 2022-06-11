export default class Step {
    id: number;
    name: string;
    task_id: number;
    finish: boolean;

    constructor(
        id: number,
        name: string,
        task_id: number,
        finish: boolean = false,
    ) {
        this.id = id;
        this.name = name;
        this.task_id = task_id;
        this.finish = finish;
    }

    static Load( step: Step ) : Step {
        return new Step(
            step.id,
            step.name,
            step.task_id,
            step.finish
        );
    }
}