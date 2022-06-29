import type Task from "@/core/model/Task";
import FilterOptions from "@/core/model/FilterOptions";

export interface iSettings {
    hideAdditional: boolean,
    hideTags: boolean,
}

const getDefaultSetting = () => ({
    hideAdditional: false,
    hideTags: false
});

export default class List {
    id: number;
    name: string;
    icon: string | null;
    tasks: Task[];
    filterOptions: FilterOptions | null;
    settings: iSettings;
    sort: number;

    constructor(
        id: number,
        name: string,
        icon: string | null = null,
        filterOptions: {} | null = null,
        sort: number = 10,
        settings: iSettings = getDefaultSetting()
    ) {
        this.id = id;
        this.name = name;
        this.icon = icon
        this.filterOptions = FilterOptions.Load( filterOptions );
        this.tasks = [];
        this.sort = sort;

        if( typeof settings === "string" ) settings = getDefaultSetting();
        this.settings = settings;
    }

    static Load( raw : List ) : List {
        return new List(
            raw.id,
            raw.name,
            raw.icon,
            raw.filterOptions,
            raw.sort,
            raw.settings
        );
    }
}