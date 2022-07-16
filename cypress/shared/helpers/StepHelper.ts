import ModelHelper from "./ModelHelper";
import {taskHelpers} from "./TaskHelper";
import {folderHelpers} from "./FolderHelper";
import {get} from "../utils";

class StepHelper extends ModelHelper {
    private init = false;

    constructor() {
        super({
            item: "step-item",
            input: "step-add-new"
        });
    }

    realCreate( name: string ) {
        const chain = this.getAddNewInput().click();

        if( ! name ) {
            return chain.type("{enter}");
        } else {
            return chain
                .type( name )
                .type("{enter}")
        }
    }

    create( name: string, currentTask: Cypress.Chainable<JQuery> | null = null ) {
        if( currentTask !== null ) {
            currentTask.click();
            this.realCreate( name );
        } else {
            if( ! this.init ) {
                taskHelpers.create("task");
                this.init = true;
                folderHelpers.getFirst().click();
                taskHelpers.getFirst().click();
            }

            this.realCreate( name );
        }
    }

    reset() {
        this.init = false;
    }
}

export const stepHelpers = new StepHelper();