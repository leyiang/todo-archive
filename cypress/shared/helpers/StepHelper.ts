import {folderHelpers} from "./FolderHelper";
import ModelHelper from "./ModelHelper";

class StepHelper extends ModelHelper {
    private init = false;

    constructor() {
        super({
            item: "task-item",
            input: "task-add-new"
        });
    }

    create( name: string ) {
        if( ! this.init ) {
            folderHelpers.create("folder");
            this.init = true;
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
        this.init = false;
    }
}

export const stepHelpers = new StepHelper();