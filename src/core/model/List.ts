import type { iList } from "@/core/types";

export default class List implements iList {
    id: number;
    name: string;
    icon: string | null;

    constructor(id: number, name: string, icon: string | null = null) {
        this.id = id;
        this.name = name;
        this.icon = icon
    }

    static Load( raw : iList ) : List {
        return new List( raw.id, raw.name, raw.icon );
    }
}