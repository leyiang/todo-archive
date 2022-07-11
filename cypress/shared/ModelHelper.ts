import {get} from "./utils";

type SelectorOptions = {
    item: string;
    input: string;
}

export default class ModelHelper {
    constructor(
        private selectors: SelectorOptions
    ) {
    }

    getAll() {
        return get( this.selectors.item );
    }

    getFirst() {
        return this.getAll().first();
    }

    getAddNewInput() {
        return get( this.selectors.input );
    }
}