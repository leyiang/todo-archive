import ModelHelper from "./ModelHelper";
import {taskHelpers} from "./TaskHelper";
import {folderHelpers} from "./FolderHelper";

class StepHelper extends ModelHelper {
    private init = false;

    constructor() {
        super({
            item: "step-item",
            input: "step-add-new"
        });
    }

    create( name: string ) {
        if( ! this.init ) {
            taskHelpers.create("task");
            this.init = true;
        }

        folderHelpers.getFirst().click();
        taskHelpers.getFirst().click();

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
        this.init = false;
    }
}

export const stepHelpers = new StepHelper();