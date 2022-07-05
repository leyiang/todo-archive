import Task from "./Task";

export default class DetailedTask extends Task {
    constructor(
        public name: string,
        public finished: boolean = false,
    ) {
        super(name, finished);
    }
}