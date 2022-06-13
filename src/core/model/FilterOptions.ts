interface rawOption {
    equal?: {
        key: string,
        value: any
    }[],

    all?: boolean
}

export default class FilterOptions {
    all: boolean;
    equal: { key: string, value: any } [];

    constructor(
        equal:{key: string, value: any}[] = [],
        all:boolean = false
    ) {
        this.all = all;
        this.equal = equal;
    }

    static Load( raw: null | rawOption ) {
        if( raw === null ) return null;

        return new FilterOptions(
            raw.equal,
            raw.all
        )
    }
}