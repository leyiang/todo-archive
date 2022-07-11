import {get} from "./utils";

class FolderHelpers {
    create( name: string ) {
        const chain = this.getAddNewInput().click();

        if( ! name ) {
            chain.type("{enter}")
        } else {
            chain.type( name ).type("{enter}")
        }

        return chain;
    }

    getAddNewInput() {
        return get("folder-add-new");
    }

    getAll() {
        return get("folder-item");
    }

    getFirst() {
        return this.getAll().first();
    }
}

export const folderHelpers = new FolderHelpers();