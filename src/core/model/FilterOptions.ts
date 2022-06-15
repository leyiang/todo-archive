interface rawOption {
    equal?: {
        key: string,
        value: any
    }[],

    all?: boolean,

    tags?: string[]
}

export default class FilterOptions {
    all: boolean;
    equal: { key: string, value: any } [];
    tags: string[];

    constructor(
        equal:{key: string, value: any}[] = [],
        tags: string[] = [],
        all:boolean = false,
    ) {
        this.all = all;
        this.equal = equal;
        this.tags = tags;
    }

    static Load( raw: null | rawOption ) {
        if( raw === null ) return null;

        return new FilterOptions(
            raw.equal,
            raw.tags,
            raw.all
        )
    }
}