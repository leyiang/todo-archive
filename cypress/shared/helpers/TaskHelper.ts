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

    realCreate( name: string, folder: Cypress.Chainable<JQuery>) {
        folder.click();

        const chain = this.getAddNewInput().click();

        if( ! name ) {
            return chain.type("{enter}");
        } else {
            return chain
                .type( name )
                .type("{enter}")
        }
    }

    create( name: string, folder: null | Cypress.Chainable = null ) {
        if( folder !== null ) {
            this.realCreate( name, folder );
        } else {
            if( ! this.initFolder ) {
                folderHelpers.create("folder");
                this.initFolder = true;
            }

            this.realCreate( name, folderHelpers.getFirst() );
        }
    }

    reset() {
        this.initFolder = false;
    }

    finishFirst() {
        get("task-finish-button")
            .first()
            .click();
    }
}

export const taskHelpers = new TaskHelper();