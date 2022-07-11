import {folderHelpers} from "./FolderHelpers";
import {get} from "./utils";

class TaskHelpers {
    create( name: string ) {
        folderHelpers.create("folder");
        folderHelpers.getFirst().click();

        get("task-add-new")
            .click()
            .type( name )
            .type("{enter}");
    }

    getAll() {
        return get("task-item");
    }

    getFirst() {
        return this.getAll().first();
    }
}

export const taskHelpers = new TaskHelpers();