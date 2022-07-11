import {folderHelpers} from "./FolderHelpers";
import {get} from "./utils";

class TaskHelpers {
    private initFolder = false;

    create( name: string ) {
        if( ! this.initFolder ) {
            folderHelpers.create("folder");
            this.initFolder = true;
        }

        folderHelpers.getFirst().click();

        const chain = get("task-add-new").click();

        if( ! name ) {
            return chain.type("{enter}");
        } else {
            return chain
                .type( name )
                .type("{enter}")
        }
    }

    getAll() {
        return get("task-item");
    }

    getFirst() {
        return this.getAll().first();
    }

    reset() {
        this.initFolder = false;
    }
}

export const taskHelpers = new TaskHelpers();