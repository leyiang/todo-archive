import type Task from "@/core/model/Task";
import type { ComputedRef } from "vue";

export default class List {
    id: number;
    name: string;
    icon: string | null;
    tasks: Task[];
    isDefault: boolean;
    filterOptions: {} | null;

    constructor(
        id: number,
        name: string,
        icon: string | null = null,
        isDefault: boolean = false,
        filterOptions: {} | null = null,
    ) {
        this.id = id;
        this.name = name;
        this.icon = icon
        this.isDefault = isDefault;
        this.filterOptions = filterOptions;
        this.tasks = [];
    }

    static Load( raw : List ) : List {
        return new List(
            raw.id,
            raw.name,
            raw.icon,
            raw.isDefault,
            raw.filterOptions
        );
    }
}