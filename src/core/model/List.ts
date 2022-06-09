import type Task from "@/core/model/Task";

export default class List {
    id: number;
    name: string;
    icon: string | null;
    tasks: Task[];
    isDefault: boolean;

    constructor(id: number, name: string, icon: string | null = null, isDefault: boolean = false ) {
        this.id = id;
        this.name = name;
        this.icon = icon
        this.tasks = [];
        this.isDefault = isDefault;
    }

    static Load( raw : List ) : List {
        return new List( raw.id, raw.name, raw.icon );
    }
}