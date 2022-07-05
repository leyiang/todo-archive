import Folder from "@/core/model/folder/Folder";
import type { filterOptions } from "@/core/model/folder/FilterOptions";
import Filter from "@/core/model/folder/FilterOptions";

export default class DynamicFolder extends Folder {
    filter: Filter;

    constructor(
        public name: string,
        filterOptions: filterOptions,
        public order = 10,
    ) {
        super(name, order);
        this.filter = new Filter( filterOptions );
    }
}