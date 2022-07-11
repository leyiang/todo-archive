import {folderHelpers} from "./FolderHelpers";
import {get} from "./utils";
import ModelHelper from "./ModelHelper";

class TaskHelpers extends ModelHelper {
    private initFolder = false;

    constructor() {
        super({
            item: "task-item",
            input: "task-add-new"
        });
    }

    create( name: string ) {
        if( ! this.initFolder ) {
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

export const taskHelpers = new TaskHelpers();