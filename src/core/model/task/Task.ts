export default class Task {
    /**
     * TODO: Should Have DetailedTask has child
     */
    public tasks: Task[] = [];

    constructor(
        public name: string,
        public finished: boolean = false,
    ) {
        
    }
}