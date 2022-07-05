import type Task from "@/core/model/task/Task";

export default class Folder {
    public tasks: Task[] = [];

    constructor(
        public name: string,
        public order = 10,
    ) {

    }
}