export default class Step {
    id: number;
    name: string;
    task_id: number;

    constructor(
        id: number,
        name: string,
        task_id: number,
    ) {
        this.id = id;
        this.name = name;
        this.task_id = task_id;
    }

    static Load( step: Step ) : Step {
        return new Step(
            step.id,
            step.name,
            step.task_id
        );
    }
}