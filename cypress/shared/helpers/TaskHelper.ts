import {folderHelpers} from "./FolderHelper";
import {get} from "../utils";
import ModelHelper from "./ModelHelper";

class TaskHelper extends ModelHelper {
    private initFolder = false;

    constructor() {
        super({
            item: "task-item",
            input: "task-add-new"
        });
    }

    create( name: string, createFolder = true ) {
        if( ! this.initFolder && createFolder ) {
            folderHelpers.create("folder");
            this.initFolder = true;
        }

        folderHelpers.getFirst().click();

        const chain = this.getAddNewInput().click();

        if( ! name ) {
            return chain.type("{enter}");
        } else {
            return chain
                .type( name )
                .type("{enter}")
        }
    }

    reset() {
        this.initFolder = false;
    }
}

export const taskHelpers = new TaskHelper();