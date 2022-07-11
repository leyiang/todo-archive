import {get} from "./utils";

class FolderHelpers {
    create( name: string ) {
        const chain = get("folder-add-new").click();

        if( ! name ) {
            return chain.type("{enter}");
        } else {
            return chain.type( name ).type("{enter}")
        }
    }

    getAll() {
        return get("folder-item");
    }

    getFirst() {
        return this.getAll().first();
    }
}

export const folderHelpers = new FolderHelpers();