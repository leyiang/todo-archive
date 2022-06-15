import type Task from "@/core/model/Task";
import FilterOptions from "@/core/model/FilterOptions";

export  interface iSettings {
    [key: string]: string | boolean
}

export default class List {
    id: number;
    name: string;
    icon: string | null;
    tasks: Task[];
    filterOptions: FilterOptions | null;
    settings: iSettings;

    constructor(
        id: number,
        name: string,
        icon: string | null = null,
        filterOptions: {} | null = null,
        settings: iSettings = {}
    ) {
        this.id = id;
        this.name = name;
        this.icon = icon
        this.filterOptions = FilterOptions.Load( filterOptions );
        this.tasks = [];
        this.settings = settings;
    }

    static Load( raw : List ) : List {
        return new List(
            raw.id,
            raw.name,
            raw.icon,
            raw.filterOptions,
            raw.settings
        );
    }
}